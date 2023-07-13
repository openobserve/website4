---
title: Understanding Kubernetes and container resource management using rust
seoTitle: Understanding Kubernetes and container resource management using rust
description: Understanding Kubernetes and container resource management using rust
img: img/blog/rust_programming_in_containers.png
alt: Understanding Kubernetes and container resource management using rust
slug: understanding-kubernetes-resource-management-using-rust-in-containers
author: prabhat
publishDate: 2023-07-13
tags:
  - rust
  - kubernetes
  - containers
  - cgroups
---

# Understanding Rust and Kubernetes Resource Management 

In today's blog, we will look at an interesting Rust code snippet and how it ties to the resource management aspects of Kubernetes. The Rust code essentially retrieves information about the CPU and memory usage of both the host and a container.

## The Rust Code

```rust
extern crate sys_info;
use std::fs;
use std::io::ErrorKind;

fn main() {
     println!("\n ------CPU and memory details from host \n");

    let cpu_num = sys_info::cpu_num().unwrap();
    println!("Number of logical CPUs is {}", cpu_num);

    let mem_info = sys_info::mem_info().unwrap();
    println!("Total RAM: {} KB", mem_info.total);
    println!("Free RAM: {} KB", mem_info.free);
    println!("Used RAM: {} KB", mem_info.total - mem_info.avail);

    println!("\n ------ CPU and memory details from container using control groups v2 \n");

    match fs::read_to_string("/sys/fs/cgroup/cpu.weight") {
        Ok(cpu_weight) => println!("CPU Weight: {}", cpu_weight),
        Err(ref error) if error.kind() == ErrorKind::NotFound 
        => println!("CPU weight file not found, possibly not running in a container"),
        Err(error) => panic!("Unexpected error: {}", error),
    }

    match fs::read_to_string("/sys/fs/cgroup/cpu.max") {
        Ok(cpu_max) => println!("CPU Max: {}", cpu_max),
        Err(ref error) if error.kind() == ErrorKind::NotFound 
        => println!("CPU max file not found, possibly not running in a container"),
        Err(error) => panic!("Unexpected error: {}", error),
    }

    match fs::read_to_string("/sys/fs/cgroup/memory.max") {
        Ok(memory_max) => println!("Memory Max: {}", memory_max),
        Err(ref error) if error.kind() == ErrorKind::NotFound 
        => println!("Memory max file not found, possibly not running in a container"),
        Err(error) => panic!("Unexpected error: {}", error),
    }

    match fs::read_to_string("/sys/fs/cgroup/memory.current") {
        Ok(memory_current) => println!("Current Memory Usage: {}", memory_current),
        Err(ref error) if error.kind() == ErrorKind::NotFound 
        => println!("Current memory usage file not found, possibly not running in a container"),
        Err(error) => panic!("Unexpected error: {}", error),
    }
}

```

In the above code, we first use the `sys_info` crate to retrieve the CPU and memory information of the host. Then, we read cgroup v2 attributes directly from their respective files in the `/sys/fs/cgroup` directory to get information on the resources allocated to the container.

## Resource Allocation in Kubernetes

Kubernetes allows us to specify resource limits and requests per container in the Pod specification. The `limits` define the maximum resources that a container can use, while the `requests` specify the resources that the Kubernetes scheduler should reserve for the container. 

```yaml
limits:
  cpu: "2"
  memory: "2Gi"
requests:
  cpu: "1"
  memory: "1Gi"
```

In the above Kubernetes configuration, the container is limited to using 2 CPUs and 2Gi of memory, while the Kubernetes scheduler will reserve 1 CPU and 1Gi of memory for the container. This helps in efficient resource allocation and prevents resource contention among Pods.

## Understanding the Results

### Result 1

```yaml
limits:
  cpu: "2"
  memory: "2Gi"
requests:
  cpu: "1"
  memory: "1Gi"
```

In the host:

- Number of logical CPUs is 4
- Total RAM: 16390360 KB
- Free RAM: 7994912 KB
- Used RAM: 6499412 KB

In the container:

- CPU Weight: 39
- CPU Max: 200000 100000
- Memory Max: 2147483648
- Current Memory Usage: 462848

### Result 2

```yaml
limits:
  cpu: "2.5"
  memory: "2.5Gi"
requests:
  cpu: "1"
  memory: "1Gi"
```

In the host:

- Number of logical CPUs is 4
- Total RAM: 16390360 KB
- Free RAM: 8013324 KB
- Used RAM: 6468524 KB

In the container:

- CPU Weight: 39
- CPU Max: 250000 100000
- Memory Max: 2684354560
- Current Memory Usage: 458752

In both cases, the host system has 4 logical CPUs and about 16GiB of RAM. The difference lies in how much CPU and memory is allocated to the container. The `CPU Max` and `Memory Max` in the container reflect the limits set in the Kubernetes configuration. When the limit is increased to 2.5 CPU and 2.5GiB of memory, these values increase accordingly. The `CPU Weight` remains the same in both cases, indicating that the share of CPU resources for the container relative to other processes is the same.

This shows how the resource limits set in Kubernetes directly control how much CPU and memory the container can use, thus isolating the resources of different containers and ensuring that no single container can overwhelm the system. Meanwhile, the Rust code provides a convenient way to monitor these resources, helping you to ensure that your applications have the resources they need and alerting you when resource usage is approaching the limit.

That's all for today's blog. We hope this has given you a deeper understanding of Rust and Kubernetes resource management!

You can find the source code for this blog [here](https://github.com/openobserve/container_limits)
