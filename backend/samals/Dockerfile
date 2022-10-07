FROM openjdk:11
COPY ./build/libs/samals-0.0.1-SNAPSHOT.jar ./webapp/samals-0.0.1-SNAPSHOT.jar
ENV JAVA_OPS=""
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./webapp/samals-0.0.1-SNAPSHOT.jar", "-dp","8080:8080"]