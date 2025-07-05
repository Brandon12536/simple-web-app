pipeline {
    agent any
    
    tools {
        // Asegúrate de que el nombre coincida con la configuración de Jenkins
        nodejs 'NodeJS' 
    }
    
    environment {
        // Variables de entorno
        APP_NAME = 'simple-web-app'
        VERSION = '1.0.0'
        DOCKER_IMAGE = "${env.APP_NAME}:${env.BUILD_NUMBER}"
        
        // Configuración de rutas (ajusta según tu sistema operativo)
        IS_WINDOWS = isUnix() ? false : true
        SHELL = env.IS_WINDOWS ? 'cmd /c' : 'sh -c'
    }
    
    stages {
        // Etapa 1: Obtener el código fuente
        stage('Checkout') {
            steps {
                echo 'Obteniendo código fuente...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/tu-usuario/simple-web-app.git',
                        credentialsId: '' // Agrega tu ID de credenciales si es necesario
                    ]],
                    extensions: [[
                        $class: 'CleanBeforeCheckout'
                    ]]
                ])
            }
        }
        
        // Etapa 2: Instalar dependencias
        stage('Instalar Dependencias') {
            steps {
                echo 'Instalando dependencias...'
                script {
                    if (env.IS_WINDOWS) {
                        bat 'npm install'
                    } else {
                        sh 'npm install'
                    }
                }
            }
        }
        
        // Etapa 3: Ejecutar pruebas unitarias
        stage('Pruebas Unitarias') {
            steps {
                echo 'Ejecutando pruebas unitarias...'
                sh 'npm test -- --coverage'
            }
            
            // Archivar resultados de pruebas
            post {
                always {
                    junit 'test-results.xml'
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'lcov-report/index.html',
                        reportName: 'Cobertura de Código'
                    ])
                }
            }
        }
        
        // Etapa 4: Construir la aplicación
        stage('Construir') {
            steps {
                echo 'Construyendo la aplicación...'
                sh 'npm run build'
                
                // Archivar artefactos
                archiveArtifacts 'dist/**/*'
            }
        }
        
        // Etapa 5: Construir imagen Docker
        stage('Construir Imagen Docker') {
            when {
                branch 'main'
            }
            steps {
                echo 'Construyendo imagen Docker...'
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        
        // Etapa 6: Desplegar (ejemplo básico)
        stage('Desplegar') {
            when {
                branch 'main'
            }
            steps {
                echo 'Desplegando la aplicación...'
                // Aquí irían los comandos para desplegar en tu entorno
                // Por ejemplo, subir a un registro de contenedores o desplegar en un servidor
                
                // Ejemplo para subir a Docker Hub (requiere credenciales configuradas en Jenkins)
                // withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PWD')]) {
                //     sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PWD}"
                //     sh "docker push ${DOCKER_IMAGE}"
                // }
                
                // Ejemplo para desplegar en un servidor vía SSH
                // sshagent(['deploy-key']) {
                //     sh 'scp -r dist/* usuario@servidor:/ruta/destino/'
                // }
            }
        }
    }
    
    // Notificaciones
    post {
        success {
            echo '¡Pipeline completado exitosamente! 🎉'
            // Ejemplo de notificación por correo
            // emailext (
            //     subject: "✅ Éxito: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //     body: 'El pipeline se ha completado correctamente.\n\n' +
            //            "Ver detalles: ${env.BUILD_URL}",
            //     to: 'tu-email@ejemplo.com'
            // )
        }
        failure {
            echo 'El pipeline ha fallado ❌'
            // emailext (
            //     subject: "❌ Fallo: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            //     body: 'El pipeline ha fallado.\n\n' +
            //            "Ver detalles: ${env.BUILD_URL}\n" +
            //            "Consulte los logs para más información.",
            //     to: 'tu-email@ejemplo.com'
            // )
        }
    }
}
