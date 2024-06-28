### Handle Traffic -

#### There are three ways

1. Horizontal scaling
2. Veritical scaling
3. Queueuing - Queuing the traffic somewhere and resume entertaining them once have
   enough reources.

### Handle traffic overloading

They are employed when all above three facilities used up.

1. Traffic shedding
2. Rate limiting - (throttling the request) - Means drop the request by sending error back to client. In case of HTTP protocol error code 429 is send.

3. Backpressure - Resisting the desired the flow of traffic.

- Request are queued up on serevr side serially, and slow down the response.
- Incoming requests are queued
  In case of front end(serach bar) - user generatign input from keyboard result in trigegr of computation which ultimatelt update DOM on screen.

Updating the DOM faster than the screen updates (60fps) may be wasteful. The window.requestAnimationFrame method may help synchronizing DOM updates with the screen update cycle.

### Reverse proxy

- It is a tool that accepts a request from the client, forward it the server take back the response from the server, send this back to the client

- It might appear as addtional hop, but its benefits outweight it cons.

Benefits -

- Reject malformed request.
- logging to any external service
- adding reqeust timeouts.
- rate limiter / back pressure
- compression
- TLS encryotion
- API gatewaty - Ability to route request based on content to the backend services.
- Cache
- Performance tracking

### LB [Load balancer]

- in case of horizonatal scaling when multiple copies of server is running LB is used to distribute traffic among them.

### HAProxy

- Opensource reverse proxy, writen in C, offload as much task as much to kernal.
- Like JS, single threaded and event driven.
- Can be deployed by shipping binary executable of size around dozens of MB.
- Configuted entirley by a text file.
- Provides an optional web dashboard that displays statistics for a running
  HAProxy instance.
- Nginx is classified as a web server, because unlike HAProxy, Nginx can map request to file on disk.
- Also able to cache response.
- Elastic Load Balancing - LB for AWS infra.

### Rate Limiting

- As a request end up being invoking a controller (usually async) which in return send back response in relevent form.

- Continue with this argument, more request means more ctrl getting scheduled by event loop invoking.

- There are at least two negative scenarios

1. Process get overwhelmed with these cb.
2. Moreover if cb is blocking function, this result in process locking up / deadlock.
3. Another issue is related with memory consumtion, because each cb have its own memory stack.

A better solution is reducing the number of concurrent connections being handled by a
NodeJS process at a given time.

One way to do is set maxConnections property over http.Server instance.

### Backpressure

- Queueing up the request on server to not overwhelmed the server.

https://medium.com/expedia-group-tech/the-cost-of-100-reliability-ecb2901f23a4

https://www.invicti.com/learn/remote-code-execution-rce/

https://medium.com/@yashbudukh/building-a-remote-code-execution-system-9e55c5b248d6

https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/

https://12factor.net/

https://docs.google.com/document/d/1MzzgB32U1dxwDhiGfxU0ZI2k04_W0tMVRPel0yojwd0/edit

https://softwaredominos.com/home/software-design-development-articles/high-level-solution-design-documents-what-is-it-and-when-do-you-need-one/

https://rachelbythebay.com/w/2024/03/05/outage/

https://www.quantstart.com/articles/Self-Study-Plan-for-Becoming-a-Quantitative-Developer/

https://search.brave.com/search?q=indian+express&source=desktop

https://dev.to/t/node
