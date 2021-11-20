pipeline {
    
    agent any  

    stages {
 
        stage('Docker check'){
            steps {
                sh  'docker --version'
                echo '******************************'
            }
        }
 
        stage('Docker compose check') {
            steps {
                sh  'docker-compose --version'
                echo '******************************'
            }
        }
        
        stage('[Build]Docker compose build') {
            
            steps {
                sh  'sudo docker-compose build'
                echo '******************************'
            }
        }

        stage('[Pre-Deploy]stop and remove old container && image'){

            steps {
                sh 'sudo docker-compose down'
                sh 'sudo docker image prune -a'
                echo '******************************'
                }
            }
        stage('[Deploy]Docker compose up'){
            steps{
                sh 'sudo docker-compose up -d'
                sh 'sudo docker ps -a'
                echo '******************************'
            }
        }

            
       

    }
}