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
        

        stage('Docker compose build') {
            
            steps {
                sh  'docker run --help'
                sh  'docker-compose help'
                echo '******************************'
            }
        }
    }
}