---
title: Tracing Python Code - Module and Function Call Execution
seoTitle: Tracing Python Code - Module and Function Call Execution
description: "Understand python -m trace: a method for tracing Python code and
  function calls for effective debugging and learning."
img: /img/resources/tracing-python-code-module-and-function-call-execution.png
alt: python -m trace
slug: python-m-trace-code-tracing
authors:
  - openobserve-team
publishDate: 2024-10-01
tags:
  - python
  - code tracing
---
<p><span style="font-weight: 400;">Tracing is the process of monitoring the execution of a program, capturing details such as function calls, line executions, and variable changes. It is crucial for debugging and understanding the flow of code, allowing developers to pinpoint where and why errors occur.</span></p>

<h3><span style="font-weight: 400;">Overview of Python Modules and Methods Used for Tracing Code and Function Calls</span></h3>

<p><span style="font-weight: 400;">Python offers several modules and methods for tracing code:</span></p>

<ul>

<li style="font-weight: 400;"><strong>trace</strong><strong> Module</strong><span style="font-weight: 400;">: Provides a simple way to trace program execution, tracking which lines of code are executed.</span></li>

<li style="font-weight: 400;"><strong>sys.settrace()</strong><span style="font-weight: 400;">: A low-level function that allows custom tracing by setting a trace function that gets called on various events such as function calls, line execution, and exceptions.</span></li>

<li style="font-weight: 400;"><strong>logging</strong><strong> Module</strong><span style="font-weight: 400;">: Can be configured to trace execution flow and capture logs for further analysis.</span></li>

</ul>

<p><span style="font-weight: 400;">By understanding and utilizing these tools, developers can effectively trace and debug their Python code, leading to more reliable and maintainable applications.</span></p>

<h2><span style="font-weight: 400;">The Mechanics of the Trace Hook</span></h2>

<h3><span style="font-weight: 400;">Explanation of the </span><span style="font-weight: 400;">sys.settrace()</span><span style="font-weight: 400;"> Function and Its Role in Tracing</span></h3>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">sys.settrace()</span><span style="font-weight: 400;"> function in Python sets a trace function that will be called for various events during program execution. This trace function is crucial for debugging as it allows developers to monitor function calls, line execution, and exceptions in real-time.</span></p>

<p><strong>Usage</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">test</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Test function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">test()</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Understanding the Callback Function Parameters: </span><span style="font-weight: 400;">frame</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">event</span><span style="font-weight: 400;">, and </span><span style="font-weight: 400;">arg</span></h3>

<ul>

<li style="font-weight: 400;"><strong>frame</strong><span style="font-weight: 400;">: Represents the current stack frame, containing information about the function being executed, such as its name, line number, and local variables.</span></li>

<li style="font-weight: 400;"><strong>event</strong><span style="font-weight: 400;">: Indicates the type of event that occurred, such as 'call', 'line', 'return', 'exception', 'c_call', 'c_return', and 'c_exception'.</span></li>

<li style="font-weight: 400;"><strong>arg</strong><span style="font-weight: 400;">: Provides additional information about the event. For example, in the case of a 'return' event, it contains the return value of the function.</span></li>

</ul>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> at line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'line'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Executing line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;"> in </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'return'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'</span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> returned </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'exception'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Exception in </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Detailed List of Event Types</span></h3>

<ul>

<li style="font-weight: 400;"><strong>call</strong><span style="font-weight: 400;">: Triggered when a function is called.</span></li>

<li style="font-weight: 400;"><strong>line</strong><span style="font-weight: 400;">: Triggered when a new line of code is executed.</span></li>

<li style="font-weight: 400;"><strong>return</strong><span style="font-weight: 400;">: Triggered when a function returns a value.</span></li>

<li style="font-weight: 400;"><strong>exception</strong><span style="font-weight: 400;">: Triggered when an exception is raised in a function.</span></li>

<li style="font-weight: 400;"><strong>c_call</strong><span style="font-weight: 400;">: Triggered when a C function is called.</span></li>

<li style="font-weight: 400;"><strong>c_return</strong><span style="font-weight: 400;">: Triggered when a C function returns.</span></li>

<li style="font-weight: 400;"><strong>c_exception</strong><span style="font-weight: 400;">: Triggered when a C function raises an exception.</span></li>

</ul>

<h3><span style="font-weight: 400;">Examples of Using the Trace Hook to Monitor Program Flow</span></h3>

<p><span style="font-weight: 400;">Using the trace hook, you can monitor the flow of your program and gather detailed execution data. Here&rsquo;s an example that traces a simple program:</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'line'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Executing line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;"> in </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'return'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'</span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> returned </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">add</span><span style="font-weight: 400;">(a, b):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; result = a + b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> result</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; x = add(</span><span style="font-weight: 400;">1</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">2</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Result: </span><span style="font-weight: 400;">{x}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling function: main</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 16 in main</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling function: add</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 10 in add</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 11 in add</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">add returned 3</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 17 in main</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main returned None</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By leveraging the </span><span style="font-weight: 400;">sys.settrace()</span><span style="font-weight: 400;"> function and understanding its mechanics, developers can gain a granular view of their code&rsquo;s execution, facilitating effective debugging and a deeper understanding of program behavior.</span></p>

<h2><span style="font-weight: 400;">Tracing Function Calls in Python</span></h2>

<h3><span style="font-weight: 400;">How to Trace All Function Calls Within a Program</span></h3>

<p><span style="font-weight: 400;">Tracing all function calls in a program helps in understanding the flow of execution and identifying issues. By using the </span><span style="font-weight: 400;">sys.settrace()</span><span style="font-weight: 400;"> function, you can set up a trace that monitors every function call.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">foo</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; bar()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">bar</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside bar"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">foo()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling </span><span style="font-weight: 400;">function</span><span style="font-weight: 400;">: foo</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling </span><span style="font-weight: 400;">function</span><span style="font-weight: 400;">: bar</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside bar</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This example traces all function calls and outputs the function names being called.</span></p>

<h3><span style="font-weight: 400;">Utilizing Example Code to Ignore Calls from Specific Functions Like </span><span style="font-weight: 400;">write()</span></h3>

<p><span style="font-weight: 400;">In some cases, you might want to ignore tracing for specific functions to reduce noise. You can achieve this by adding conditions within the trace function to skip certain functions.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span> <span style="font-weight: 400;">and</span><span style="font-weight: 400;"> frame.f_code.co_name != </span><span style="font-weight: 400;">'write'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">write</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside write"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">read</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside read"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; write()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; read()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling </span><span style="font-weight: 400;">function</span><span style="font-weight: 400;">: main</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling </span><span style="font-weight: 400;">function</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">read</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside write</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside </span><span style="font-weight: 400;">read</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example, the </span><span style="font-weight: 400;">write</span><span style="font-weight: 400;"> function calls are ignored in the trace output.</span></p>

<h3><span style="font-weight: 400;">Interpreting the Output of Traced Calls to Understand Program Execution</span></h3>

<p><span style="font-weight: 400;">Interpreting the trace output is essential to understanding how your program executes. Each line in the trace output corresponds to a function call, providing insights into the sequence of operations.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> at line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">add</span><span style="font-weight: 400;">(a, b):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; result = a + b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> result</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">multiply</span><span style="font-weight: 400;">(a, b):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; result = a * b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> result</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; x = add(</span><span style="font-weight: 400;">1</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">2</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; y = multiply(</span><span style="font-weight: 400;">3</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">4</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Results: </span><span style="font-weight: 400;">{x}</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">{y}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling function: main at </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">18</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling function: add at </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">14</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling function: multiply at </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">18</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside </span><span style="font-weight: 400;">write</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside </span><span style="font-weight: 400;">read</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Results: </span><span style="font-weight: 400;">3</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">12</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By analyzing this output, you can see the order of function calls and understand the flow of the program. This helps in debugging and ensuring the program executes as expected.</span></p>

<p><span style="font-weight: 400;">By tracing function calls effectively, developers can gain valuable insights into the execution flow, making it easier to debug and optimize their code. This understanding is crucial for maintaining and improving complex Python applications.</span></p>

<h2><span style="font-weight: 400;">In-depth Function Execution Tracing</span></h2>

<h3><span style="font-weight: 400;">Strategies for Tracing Within Specific Functions or Modules to Limit Output</span></h3>

<p><span style="font-weight: 400;">When dealing with large codebases, tracing every function call can generate overwhelming amounts of data. To manage this, you can target specific functions or modules for tracing. This selective tracing helps focus on the parts of the code that are most relevant to your debugging or analysis needs.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span> <span style="font-weight: 400;">and</span><span style="font-weight: 400;"> frame.f_code.co_name == </span><span style="font-weight: 400;">'target_function'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> at line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">target_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside target_function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">other_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside other_function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; target_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; other_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling function: target_function at </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">12</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside other_function</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example, only </span><span style="font-weight: 400;">target_function</span><span style="font-weight: 400;"> is traced, reducing the amount of trace data.</span></p>

<h3><span style="font-weight: 400;">Implementing Local Trace Functions for Targeted Tracing</span></h3>

<p><span style="font-weight: 400;">For more fine-grained control, you can implement local trace functions that are activated only within certain functions. This method allows you to trace the execution within specific functions without affecting the global trace setup.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">local_trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'line'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Executing line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;"> in </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> local_trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">target_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; sys.settrace(local_trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Start target_function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; x = </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; y = x + </span><span style="font-weight: 400;">20</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"End target_function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; sys.settrace(</span><span style="font-weight: 400;">None</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">other_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Inside other_function"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; target_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; other_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Executing line 10 in target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Start target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 11 in target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 12 in target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing line 13 in target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">End target_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Inside other_function</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This example shows detailed line-by-line tracing within </span><span style="font-weight: 400;">target_function</span><span style="font-weight: 400;">, without affecting other functions.</span></p>

<h3><span style="font-weight: 400;">Analyzing Output to Examine Line-by-Line Execution Within Specific Functions</span></h3>

<p><span style="font-weight: 400;">Line-by-line execution tracing provides an in-depth view of how individual lines within a function are executed, which is essential for debugging complex logic and pinpointing errors.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr style="height: 282.453px;">

<td style="height: 282.453px;">

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">local_trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'line'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Executing line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;"> in </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> local_trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">complex_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; sys.settrace(local_trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; a = </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; b = </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; c = a + b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Result: </span><span style="font-weight: 400;">{c}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; sys.settrace(</span><span style="font-weight: 400;">None</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; complex_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span><span style="font-weight: 400;"><br /><br /></span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Executing </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">10</span><span style="font-weight: 400;"> in complex_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">11</span><span style="font-weight: 400;"> in complex_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">12</span><span style="font-weight: 400;"> in complex_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Executing </span><span style="font-weight: 400;">line</span> <span style="font-weight: 400;">13</span><span style="font-weight: 400;"> in complex_function</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Result: </span><span style="font-weight: 400;">15</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By examining the output, you can follow the exact sequence of operations within </span><span style="font-weight: 400;">complex_function</span><span style="font-weight: 400;">, making it easier to understand the logic and identify any issues.</span></p>

<p><span style="font-weight: 400;">By employing these strategies for targeted tracing, developers can efficiently manage trace output and focus on critical parts of their code. This approach enhances the debugging process and provides deeper insights into specific areas of interest.</span></p>

<h2><span style="font-weight: 400;">Monitoring Stack Operations</span></h2>

<h3><span style="font-weight: 400;">Leveraging Trace Hooks to Observe Function Calls and Their Return Values</span></h3>

<p><span style="font-weight: 400;">Understanding the function call stack and return values is critical for debugging and optimizing code. By using trace hooks, you can monitor these operations and gain insights into how functions interact and what values they return.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls_and_returns</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> at line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'return'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'</span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> returned </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls_and_returns</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls_and_returns)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">add</span><span style="font-weight: 400;">(a, b):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> a + b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">multiply</span><span style="font-weight: 400;">(a, b):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> a * b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; result1 = add(</span><span style="font-weight: 400;">1</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">2</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; result2 = multiply(</span><span style="font-weight: 400;">3</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">4</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Results: </span><span style="font-weight: 400;">{result1}</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">{result2}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling function: main at line 16</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling function: add at line 12</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">add returned 3</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling function: multiply at line 13</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">multiply returned 12</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Results: 3, 12</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This output shows the sequence of function calls and their return values, providing a clear picture of the stack operations.</span></p>

<h3><span style="font-weight: 400;">Code Examples Showcasing How to Dynamically Change Trace Functions On-the-Fly</span></h3>

<p><span style="font-weight: 400;">In some cases, you might need to change the trace function dynamically based on the context of the program execution. This can be useful for focusing on different aspects of the code at various points.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_calls</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Calling function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> at line </span><span style="font-weight: 400;">{frame.f_lineno}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> frame.f_code.co_name == </span><span style="font-weight: 400;">'nested_function'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; sys.settrace(trace_returns)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_calls</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_returns</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'return'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'</span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> returned </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_returns</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_calls)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">nested_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span> <span style="font-weight: 400;">"Nested Result"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main_function</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Main Function Start"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; nested_function()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">"Main Function End"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main_function()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Calling function: main_function at line 18</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Main Function </span><span style="font-weight: 400;">Start</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Calling</span> <span style="font-weight: 400;">function</span><span style="font-weight: 400;">: nested_function </span><span style="font-weight: 400;">at</span><span style="font-weight: 400;"> line </span><span style="font-weight: 400;">14</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">nested_function returned </span><span style="font-weight: 400;">Nested</span> <span style="font-weight: 400;">Result</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Main</span> <span style="font-weight: 400;">Function</span> <span style="font-weight: 400;">End</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example, the trace function changes when a </span><span style="font-weight: 400;">nested_function</span><span style="font-weight: 400;"> is called, focusing on return values for that specific function before reverting back.</span></p>

<h3><span style="font-weight: 400;">Understanding Function Call Stacks Through Tracing Return Values</span></h3>

<p><span style="font-weight: 400;">Analyzing function call stacks through return values helps in understanding how data flows through the program and identifying where errors might originate.</span></p>

<p><strong>Example</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> sys</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">trace_stack</span><span style="font-weight: 400;">(frame, event, arg):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'call'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Entering function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">elif</span><span style="font-weight: 400;"> event == </span><span style="font-weight: 400;">'return'</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f'Exiting function: </span><span style="font-weight: 400;">{frame.f_code.co_name}</span><span style="font-weight: 400;"> with return value </span><span style="font-weight: 400;">{arg}</span><span style="font-weight: 400;">'</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> trace_stack</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sys.settrace(trace_stack)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">func_a</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> func_b()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">func_b</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span> <span style="font-weight: 400;">"Hello from func_b"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">main</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message = func_a()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(message)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">main()</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Output</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Entering function: main</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Entering function: func_a</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Entering function: func_b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Exiting function: func_b with return value Hello from func_b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Exiting function: func_a with return value Hello from func_b</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Exiting function: main with return value None</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Hello from func_b</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This output illustrates the flow of execution and how values are passed through different functions, providing a clear view of the function call stack.</span></p>

<p><span style="font-weight: 400;">By leveraging trace hooks to monitor stack operations, developers can gain detailed insights into function interactions and return values. This information is crucial for debugging complex programs and optimizing code performance.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Tracing Python code is an invaluable skill for developers, providing deep insights into code execution, function calls, and error handling.</span></p>

<p><span style="font-weight: 400;">For larger applications and distributed systems, where comprehensive observability is crucial, tools like OpenObserve (O2) can provide deeper insights and enhanced visualization capabilities. While Python's </span><span style="font-weight: 400;">trace</span><span style="font-weight: 400;"> module handles individual code tracing well, OpenObserve can help monitor and analyze your entire system's performance, logs, and traces.</span></p>

<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to start using OpenObserve today. Happy coding!</span></p>

<p><span style="font-weight: 400;">This way, you maintain the focus on Python tracing while gently introducing OpenObserve as a potential tool for those interested in broader observability solutions.</span></p>
