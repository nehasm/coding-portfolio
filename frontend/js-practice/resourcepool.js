// Explanation of Resource Pool

// The Resource Pool (or Object Pool) design pattern is used to manage a collection of reusable objects.
//  It is particularly useful when the cost of creating and destroying objects is high, and frequent reuse of objects is beneficial. 

// Key Concepts:
// 1. Object Pooling:
//     Instead of creating a new object each time it is needed, an object pool maintains a pool of objects that can be reused. 
//     When an object is required, it is borrowed from the pool. 
//     Once the object is no longer needed, it is returned to the pool for future use.

// 2. Resource Management: 
//     Object pooling helps in managing resources efficiently, reducing the overhead of object creation and garbage collection.

// 3. Efficiency: 
// By reusing objects, applications can achieve better performance and lower memory consumption.

// Usage Scenarios:
// - When the initialization of objects is costly.
// - When the application needs a large number of objects, but only a few are used at a time.
// - In scenarios where objects are frequently created and destroyed, such as in games or connection pooling.



//  Code Explanation

// ResourcePoolMember Class:
// This class represents an individual resource within the pool.


class ResourcePoolMember {
  constructor(value) {
    this.value = value;  // The actual data or resource
    this.available = true;  // Indicates if the resource is available for use
  }
}


// - `value`: Stores the data or resource.
// - `available`: A flag to indicate if the resource is available to be checked out from the pool.

// ResourcePool Class:
// This class manages a collection of `ResourcePoolMember` instances.


class ResourcePool {  
  constructor(creatorMethod, resetMethod, size) {
    this.creatorMethod = creatorMethod;  // Function to create new resources
    this.resetMethod = resetMethod;  // Function to reset resources
    this.poolArray = new Array(size).fill(null).map(() => this.createMember());
  }

  createMember() {
    const data = this.creatorMethod();
    return new ResourcePoolMember(data);
  }

  getMember() {
    for (const member of this.poolArray) {
      if (member.available) {
        member.available = false;
        return member;
      }
    }
    // Create a new member if none are available
    const newMember = this.createMember();
    newMember.available = false;
    return newMember;
  }

  releaseMember(element) {
    this.resetMethod(element.value);  // Reset the value
    element.available = true;  // Mark the resource as available
  }
}


// - constructor(creatorMethod, resetMethod, size): Initializes the pool with a given size, using the provided methods for creating and resetting resources.
// - createMember(): Creates a new resource using the `creatorMethod`.
// - getMember(): Retrieves an available resource from the pool or creates a new one if all resources are in use.
// - releaseMember(element): Returns a resource to the pool and resets its state using the `resetMethod`.

// Test Example:


const creatorFunc = () => ({ counter: 0 });
const resetFunc = (obj) => {
  obj.counter = 0; 
  return obj;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 10);
const resource = myPool.getMember();
resource.value.counter++;
console.log(resource.value); // { counter: 1 }

myPool.releaseMember(resource);
console.log(resource.value); // { counter: 0 }


// - creatorFunc: Function to create new resource objects.
// - resetFunc: Function to reset the resource state when it is returned to the pool.
// - myPool: Creates a new resource pool with 10 resources.
// - getMember(): Retrieves a resource, modifies it, and logs its state.
// - releaseMember(): Returns the resource to the pool and logs its reset state.

//  Summary of Code

// The provided Resource Pool implementation efficiently manages a set of reusable resources:

// 1. ResourcePoolMember: Represents individual resources with a state indicating availability.
// 2. ResourcePool:
//    - Initialization: Creates a pool of resources using specified `creatorMethod` and `resetMethod`.
//    - Resource Management: Provides methods to obtain (`getMember()`) and release (`releaseMember()`) resources, ensuring efficient reuse.
// 3. Testing:
//    - Demonstrates creating a resource pool, retrieving a resource, modifying its state, and then returning it to the pool with a reset state.

// This pattern helps improve performance and manage resources more effectively by avoiding frequent object creation and leveraging reusable objects.