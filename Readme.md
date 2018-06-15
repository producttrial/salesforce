Due to lack of time: no deployment and no tests.

Questions:
* There are couple of problems:
 1. Accessing the data can be problematic and making sure we maintain the data integrity is not trivial
 2. Data encapsulation. Basically who owns the data, it looks like it's a distributed data problem.
 3. There is no single source of truth, at least in this example, therefore a consolidate data store could be an approach to solve this problem.
 
* I wouldn't necessarily. Another layer of abstraction can be build on top of these and end user interaction should be happening through this layer of abstractization.
Avatanges:
 1. If changes are required, these are transparent, and changes in underlying services do not impact the overall infstracture.
 2. Scalability. If there is another source of data, this can be coupled with existing ones.
 3. SSO, one user may use a single sign on from a central place to access all the other sites (if needed).
 4. Abstractization: Each entity owns its own data and is responsbile for its integrity.