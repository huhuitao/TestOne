module.exports = function (grunt) {
  return {
    exec: {
      tag: {
        command: 'git tag publish/<%= currentBranch %>',
      },
      publish: {
        command: 'git push origin publish/<%= currentBranch %>:publish/<%= currentBranch %>',
      },
      commit: {
        command(msg) {
          return `git commit -m "${msg}"`;
        },
      },
      add: {
        command: 'git add . -A',
      },
      build: {
        command: 'npm run build',
      },
      prepub: {
        command: 'git push origin daily/<%= currentBranch %>',
      },
      // 切新分支
      new_branch: {
        command: 'git checkout -b daily/<%= currentBranch %>',
      },
      npm_outdated: {
        command: 'npm outdated --long --registry=http://registry.npm.alibaba-inc.com',
      },
    },
  };
};
