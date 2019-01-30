# Introduction

Welcome to a tutorial and the opportunity to learn a bit about Docker. This is a simple case example intended to show you a Docker-based "app", a system with 3 containers, that shall be installed in a host system, a computer.

Such system is comprised of 3 services:

* A Web Server, using Apache2
* A NodeJS-based Web Server Simple app 1
* Another NodeJS-based Web Server Simple app 2

The idea here is to put the Apache2 serving content from the other apps via port 80. The apache will connect the user to app 1 or app 2 based on virtual host configuration. So, if the user tries to access claiming a "www.myexamplesite.com", the proxy configuration in the Apache should connect with the service 1 / app 1. If instead the user tries to access the server claiming "www.myothersite.com", the proxy will use service 2 / app 2.

## Let's first create the images that Docker compose will use to eventually launch the containers

* Access "./image-webserver" and run "./makeImage.sh"
* Access "./image-app-1" and run "./makeImage.sh"
* Access "./image-app-2" and run "./makeImage.sh"

Now you can check the images that you have created:

```
sudo docker image ls
```

## Let's check how to launch the services (and associated containers)

First, let's look at our docker-compose.yml:

```
version: "3"
services:
  service.web:
    image: image-webserver
    ports:
      - "80:80"
    restart: always

  service.app.1:
    image: image-app-1
    ports:
      - "8080:8080"
    restart: always

  service.app.2:
    image: image-app-2
    ports:
      - "8081:8081"
    restart: always
```

Notice that the above compose specification uses names, such as "service.web", "service.app.1", and "service.app.2" in association with the images. According to [Networking in Compose](https://docs.docker.com/compose/networking/) Docker compose will create a common network so the containers (associated with these services) can reach each other.

Therefore, when using Docker compose, a network gets created and the containers can be reachable using the service names (e.g., service.web, service.app.1, service.app.2). Notice that these names were my own and I have decided to name them using the notation "something.dot.something" just so they could look like a domain.

### Launching

When you launch the system, with "sudo docker-compose-up", keep in mind that Docker compose will launch one container for each service.

```
sudo docker-compose up
```

Notice: **In this example, we are launching "docker-compose" without the "-d" parameter so that we can see log outputs, eventually served from the NodeJS-based scripts. **

As you launch these 3 services, you shall verify that Docker Compose creates a networks and informs you about the name that is the name of the directory where this "docker-compose.yml" is installed.

In my case, this local root directory was named "compose" so Docker Compose created a network called "compose".

### Testing

Before we attempt to use the browser, to load the apps, we need to tell your local computer and map the names (eg., www.myexamplesite.com,
www.myothersite.com) as your localhost.

```
sudo vi /etc/hosts
```

And add the following lines:

```
127.0.0.1 www.myexamplesite.com
127.0.0.1 www.myothersite.com
```

Now you are good to go, you can open your best browser and try each domain. Notice the log outputs served in the shell where you launched via docker-compose.

Notice: I am using a Mac so I had a problem with the /etc/hosts file being ignored. I was able to fix due to [this solution](https://superuser.com/questions/1191172/osx-sierra-hosts-file-is-ignored) editing the /etc/resolv.conf.

Of course this is a controlled scenario that you are informing your local computer that the above domains are the 127.0.0.1. In the real world and production scenario you shall be using DNS servers with a real domain propagated. If you liked this tutorial please feedback me. Here is a [video with my narrative](http://youtu.be/id-RHuGqTXw)
