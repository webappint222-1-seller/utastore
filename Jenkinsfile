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
                sh  'docker run hello-world'
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