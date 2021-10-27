pipeline {
    
    agent any  

    stages {
 
        stage('Init'){
            steps {
                echo 'Init'
                echo '******************************'
            }
        }
 
        stage('Docker Build') {
            steps {
                sh  'sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh  'sudo chmod +x /usr/local/bin/docker-compose'
                sh  'docker-compose --version'
                echo '******************************'
            }
        }
 
        stage('Docker Deploy') {
            steps {
                sh 'docker-compose up -d'
                echo '******************************'
            }
        }
 
    }
}