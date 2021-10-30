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

        stage('[Pre-Deploy]stop and remove old container'){

            steps {
                sh 'docker-compose down'
                echo '******************************'
                }
            }
        stage('[Deploy]Docker compose up'){
            steps{
                sh 'docker-compose up -d'
                echo '******************************'
            }
        }

            
       

    }
}