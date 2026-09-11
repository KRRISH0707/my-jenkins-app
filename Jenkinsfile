pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'reports/junit.xml'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        set -e
                        rm -rf gh-pages-deploy
                        git clone --depth 1 https://x-access-token:${GITHUB_TOKEN}@github.com/KRRISH0707/my-jenkins-app.git gh-pages-deploy
                        cd gh-pages-deploy
                        git checkout gh-pages || git checkout --orphan gh-pages
                        git rm -rf . || true
                        cp -r ../dist/* .
                        git add -A
                        git -c user.name="Jenkins CI" -c user.email="ci@jenkins.local" commit -m "Deploy build ${BUILD_NUMBER}" || echo "Nothing to commit"
                        git push origin gh-pages
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Build #${env.BUILD_NUMBER} succeeded! Site deployed."
        }
        failure {
            echo "Build #${env.BUILD_NUMBER} failed."
        }
        always {
            cleanWs()
        }
    }
}