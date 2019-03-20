const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const gruntConfig = require('./grunt/exec');
const shell = require('shelljs');
const checkDependencies = require('check-dependencies');

const isWin = process.platform === 'win32';
let npm = isWin ? 'npm.cmd' : 'npm';
if (shell.which('cnpm')) {
  npm = isWin ? 'cnpm.cmd' : 'cnpm';
}
if (shell.which('tnpm')) {
  npm = isWin ? 'tnpm.cmd' : 'tnpm';
}

// a：二维数组，index，比较第几个
// return：返回保留比较后的结果组成的二维数组
function findMax(a, index) {
  const t = [];
  const b = [];
  const r = [];
  for (let i = 0; i < a.length; i += 1) {
    t.push(Number(a[i][index]));
  }
  const max = Math.max.apply(this, t);
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][index] === max) {
      b.push(i);
    }
  }
  for (let i = 0; i < b.length; i += 1) {
    r.push(a[b[i]]);
  }
  return r;
}

// 得到最大的版本号
function getBiggestVersion(A) {
  const a = [];
  if (!A) {
    return [0, 0, 0];
  }
  for (let i = 0; i < A.length; i += 1) {
    if (A[i].match(/^\d+\.\d+\.\d+$/)) {
      const sp = A[i].split('.');
      a.push([
        Number(sp[0]),
        Number(sp[1]),
        Number(sp[2]),
      ]);
    }
  }
  const r = findMax(findMax(findMax(a, 0), 1), 2);
  return r[0];
}

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-exec');

  const task = grunt.task;

  const getBranchVersion = (callback) => {
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
      const reg = /daily\/(\S+)/;
      const match = stdout.match(reg);
      if (!match) {
        grunt.fatal(`
          当前分支为 master 或者名字不合法(daily/x.y.z)，建议切换到daily分支
          创建新daily分支：grunt newbranch
          只执行构建：grunt build
        `);
      } else {
        callback(match[1]);
      }
    });
  };

  // -------------------------------------------------------------
  // 任务配置
  // -------------------------------------------------------------

  grunt.initConfig(gruntConfig(grunt));

  grunt.registerTask('checkDep', '检查依赖安装', function () {
    const done = this.async();
    checkDependencies({ checkGitUrls: true }).then(({ depsWereOk, error }) => {
      if (depsWereOk) {
        grunt.log.ok('依赖校验通过');
        done();
      } else {
        error.forEach(err => grunt.log.writeln(err));
        grunt.fatal('依赖校验失败, 请检查依赖安装');
      }
    });
  });

  grunt.registerTask('dev', '开启 Dev 开发模式', function () {
    grunt.log.writeln('本地开发开启');
    const done = this.async();
    const worker = spawn(npm, isWin ? ['run', 'win'] : ['start'], { stdio: 'inherit' });
    worker.on('error', (error) => {
      grunt.log.write(error);
      done();
    });
  });

  // 创建新分支
  grunt.registerTask('newbranch', '获取当前最大版本号,创建新的分支', function (type) {
    const done = this.async();
    exec('git branch -a & git tag', (err, stdout) => {
      const versions = stdout.match(/\d+\.\d+\.\d+/ig);
      let r = getBiggestVersion(versions);
      if (!r || !versions) {
        r = '0.1.0';
      } else if (type === 'major') {
        r[0] += 1;
        r[1] = 0;
        r[2] = 0;
        r = r.join('.');
      } else if (type === 'minor') {
        r[1] += 1;
        r[2] = 0;
        r = r.join('.');
      } else {
        r[2] += 1;
        r = r.join('.');
      }
      grunt.log.write((`新分支：daily/${r}`).green);
      grunt.config.set('currentBranch', r);
      task.run(['exec:new_branch']);
      done();
    });
  });

  // 预发布资源文件
  grunt.registerTask('prepub', '预发布', function (type, msg) {
    const done = this.async();
    if (type && (type !== 'nobuild') && !msg) {
      msg = type;
      type = null;
    }
    getBranchVersion((version) => {
      grunt.log.write((`当前分支：${version}`).green);
      grunt.config.set('currentBranch', version);
      let resultTask = [
        'exec:add',
        `exec:commit:${msg || 'noMessage'}`,
        'exec:prepub',
      ];

      const defaultTask = ['checkDep', 'build'];
      if (type !== 'nobuild') {
        resultTask = defaultTask.concat(resultTask);
      }

      task.run(resultTask);
      done();
    });
  });

  // 正式发布资源文件
  grunt.registerTask('publish', '正式发布', function (type, msg) {
    const done = this.async();
    if (type && (type !== 'nobuild') && !msg) {
      msg = type;
      type = null;
    }
    getBranchVersion((version) => {
      grunt.log.write((`当前分支：${version}`).green);
      grunt.config.set('currentBranch', version);
      let resultTask = [
        'exec:add',
        `exec:commit:${msg || 'noMessage'}`,
        'exec:prepub',
        'exec:tag',
        'exec:publish',
      ];

      // 检查依赖后build
      const defaultTask = ['checkDep', 'build'];
      if (type !== 'nobuild') {
        resultTask = defaultTask.concat(resultTask);
      } else {
        resultTask.splice(0, 3);
      }

      task.run(resultTask);
      done();
    });
  });

  // 默认构建任务
  grunt.registerTask('build', '默认构建流程', function () {
    grunt.log.write('本地构建开始'.green);

    const done = this.async();
    const worker = spawn(npm, ['run', 'build'], { stdio: 'inherit' });

    worker.on('error', (error) => {
      grunt.log.write(error);
      done();
    });

    worker.on('exit', () => {
      done();
    });
  });

  grunt.registerTask('default', '默认构建流程', () => {
    task.run(['checkDep', 'build']);
  });
};
