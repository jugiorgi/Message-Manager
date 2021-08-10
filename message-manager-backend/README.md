# Message Manager API

## About

This is a unique notification application. In this application it is possible to configure and send e-mail to one or
more people simultaneously.

#### To run the project, you will need to install:

<ul>
    <li>
        <strong>Java: </strong> 1.8+
    </li>
    <li>
        <strong>Maven: </strong> 3.8.1+
    </li>
    <li>
        <strong>Database: </strong> PostgreSQL
    </li>
</ul>

<blockquote>
    To be able to send  the email the spring profiles active needs to be "dev"
</blockquote>

#### application.properties example:

```sh
spring.profiles.active=dev
server.port=8080
spring.jpa.open-in-view=false
spring.jpa.database=POSTGRESQL
spring.datasource.platform=postgres
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create-drop
spring.database.driverClassName=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=<your postgres password>
server.contextPath=/swagger2-demo
```


#### Installing the Dependencies

```sh
  mvn clean 
  mvn install
```

<blockquote>
    When committing, don't forget to remove personal information from properties. 
    <br> *Check "application-dev.properties" and remove passwords
</blockquote>

### Overview

<p>
    For more details: 
    <a href="http://localhost:8080/swagger-ui/#/">Swagger</a>
</p>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15082415-bea18d97-2144-4c3d-8c9e-8876ee60004d?action=collection%2Ffork&collection-url=entityId%3D15082415-bea18d97-2144-4c3d-8c9e-8876ee60004d%26entityType%3Dcollection%26workspaceId%3D63deb841-adce-44d6-b155-11b4159cc2f1#?env%5BLocal%5D=W3sia2V5Ijoic2VydmVyIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRlbXBsYXRlSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZW1haWxDb25maWd1cmF0aW9uSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiZW1haWxDb25maWdJZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)

<br>
#### Create/Upload E-mail Template Example

```sh
  [POST] https://localhost:8080/templates
  Request: 
  form-data file with name "template"
  * you can find an example of tamplate in: "resources/templates"
  Successful Response: 
   Status Code: "201 Created"
  {
    "id": 1,
    "template": "<body style=\"margin: 0; padding: 0;\"><table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\"> <tr> <td align=\"center\" bgcolor=\"#836FFF\" style=\"padding: 40px 0 30px 0;\"> <img src=\"https://hawkemedia.com/wp-content/uploads/Email-Gif.gif\" alt=\"Criando Mágica de E-mail\" width=\"300\" height=\"230\" style=\"display: block;\" /></td> </tr> </table></body>"
  }
```

#### Create an E-mail Configuration Example

```sh
  [POST] https://localhost:8080/configuration/emails
  Request: 
  {
    "serverName": "gmail",
    "port": "465",
    "login": "string",
    "password": "string",
    "senderName": "string",
    "senderEmail": "string",
    "templates": [
        1
    ]
  }
  Successful Response: 
  Status Code: "201 Created"
  {
    "id": 1,
    "serverName": "gmail",
    "port": "465",
    "login": "string",
    "password": null,
    "senderName": "string",
    "senderEmail": "string",
    "templates": [
        1
    ]
  }
```

#### Sending E-mail Example

```sh
  [POST] https://localhost:8080/notifications/email
  Request: 
  {
    "emails": [
        "string",
        "string"
    ],
    "origin": "API",
    "templateId": 1
  }
  Successful Response: 
  Status Code: "204 No Content"
```

#### Notification History Example

```sh
  [POST] https://localhost:8080/notifications/historic?page=1&linesPerPage=10&direction=ASC&orderBy=createdAt
  Request: 
  {
    "initialDate": "yyyy-mm-dd",
    "finalDate": "yyyy-mm-dd",
    "channel": "EMAIL",
    "origin": "API or PLATFORM"
  }
  Successful Response: 
  Status Code: "200 OK"
  {
    "content": [
        {
            "id": 1,
            "channel": "EMAIL",
            "origin": "API",
            "title": null,
            "message": null,
            "content": "<body style=\"margin: 0; padding: 0;\"><table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\"> <tr> <td align=\"center\" bgcolor=\"#836FFF\" style=\"padding: 40px 0 30px 0;\"> <img src=\"https://hawkemedia.com/wp-content/uploads/Email-Gif.gif\" alt=\"Criando Mágica de E-mail\" width=\"300\" height=\"230\" style=\"display: block;\" /></td> </tr> </table></body>",
            "createdAt": "2021-08-10T16:17:00.885Z",
            "updatedAt": null
        }
    ],
    "pageable": {
        "sort": {
            "unsorted": false,
            "sorted": true,
            "empty": false
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 10,
        "unpaged": false,
        "paged": true
    },
    "totalPages": 1,
    "totalElements": 1,
    "last": true,
    "size": 10,
    "number": 0,
    "sort": {
        "unsorted": false,
        "sorted": true,
        "empty": false
    },
    "numberOfElements": 1,
    "first": true,
    "empty": false
  }
```

<br>
<footer>Developed by: Julia Giorgi Martin</footer>