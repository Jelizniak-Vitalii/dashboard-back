docker stop dashboard-back
docker rm --force dashboard-back
docker rmi dashboard-back-image
docker build . -t dashboard-back-image
docker run -d -p 4000:4000 --name dashboard-back dashboard-back-image
