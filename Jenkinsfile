pipeline {
    
    agent any  

    stages {
        
        stage('[Build]Docker compose build') {
            
            steps {
                sh  'sudo docker-compose build'
                echo '******************************'
            }
        }

        stage('[Pre-Deploy]stop and remove old container && image'){

            steps {
                sh 'sudo docker-compose down'
                sh 'sudo docker image prune -a -f'
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
        stage('[After-Deploy]clear old  image'){

            steps {
                sh 'sudo docker image prune -a -f'
                echo '******************************'
                }
            }

            
       

    }
}