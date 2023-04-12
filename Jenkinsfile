#!/bin/groovy

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: "5"))
        durabilityHint("PERFORMANCE_OPTIMIZED")
        disableConcurrentBuilds()
        timeout(time: 1, unit: "HOURS")
    }

    agent {
        dockerfile {
            label "docker-windows"
            filename "WindowsAgentDockerfile"
        }
    }

    parameters {
        booleanParam(name: "DeployToGitHub", description: "", defaultValue: false)
    }

    stages {
        stage("Install") {
            steps {
                bat "yarn install --immutable"
            }
        }
        stage("Build") {
            steps {
                bat "yarn build:all"
            }
        }
        stage("Deploy to GitHub") {
            when {
                expression { env.DeployToGitHub == true }
            }
            steps {
                nodejs(nodeJSInstallationName: "node-18") {
                    withCredentials([sshUserPrivateKey(credentialsId: "tridion-sites-extensions-examples-github-ssh", keyFileVariable: "SSH_KEY")]) {
                        script {
                            def SSH_KEY_UNIX_STYLE_PATH = env.SSH_KEY.replaceAll("\\\\","/")
                            withEnv(["GIT_SSH_COMMAND=ssh -i $SSH_KEY_UNIX_STYLE_PATH -o StrictHostKeyChecking=no"]){
                                bat "git push --mirror git@github.com:RWS/tridion-sites-extensions-examples.git"
                            }
                        }
                    }
                }
            }
        }
    }
}
