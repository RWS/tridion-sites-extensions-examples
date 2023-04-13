pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        durabilityHint('PERFORMANCE_OPTIMIZED')
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
    }

    agent {
        dockerfile {
            label 'docker-linux'
            filename 'Dockerfile'
        }
    }

    parameters {
        booleanParam(name: 'DeployToGitHub', description: '', defaultValue: false)
    }

    stages {
        stage('Install') {
            steps {
                sh 'yarn install --immutable'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn run build:all'
            }
        }

        stage('Deploy to GitHub') {
            when {
                allOf {
                    branch 'develop'
                    equals expected: true, actual: params.DeployToGitHub
                }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'tridion-sites-extensions-examples-github-ssh', keyFileVariable: 'SSH_KEY')]) {
                    withEnv(['GIT_SSH_COMMAND=ssh -o StrictHostKeyChecking=no -i ${SSH_KEY}']) {
                        sh 'git remote -v | grep -w github || git remote add github git@github.com:RWS/tridion-sites-extensions-examples.git'
                        sh 'git switch -c local_develop origin/develop'
                        sh 'git push github local_develop:develop'
                        sh 'git branch -D local_develop'
                    }
                }
            }
        }
    }
}
