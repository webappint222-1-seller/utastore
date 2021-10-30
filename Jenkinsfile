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
            
            step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])
        }
    }
}