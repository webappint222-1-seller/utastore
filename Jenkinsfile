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
                sh  'docker --version'
                echo '******************************'
            }
        }
    }
}