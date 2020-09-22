---
title:      "Maze Generation and Prim's Algorithm"
slug:       "prims-algorithm"
date:       2020-09-21 13:45:00
categories: programming
tags:       prim algorithm labyrinth maze
toc:        true
toc_sticky: true
toc_label:  "In this post"
toc_icon:   "flask"
excerpt: "Ever wondered how mazes can be generated? Learn about Prim's
 algorithm and visually see how it works."
header:
  overlay_image:  "/assets/images/algorithm.jpg"
  teaser:         "/assets/images/algorithm.jpg"
  overlay_filter: rgba(0, 0, 0, 0.3)
  caption:        "Photo by [Blake Connally](https://unsplash.com/@blakeconnally) on Unsplash"
---

All my life I've been fascinated by mazes. There is something mesmerizing
about how intricate they can be. In my head they represent some sort of 
visualization for the order of chaos.

However, what purpose can they serve, other than entertaining people trying
to find the way from the start to the end?

## Why generate mazes?
Imagine the maze as a set of intersections connected by paths which make the
maze's corridors. Under this light, the maze can be interpreted as an
undirected graph, where each intersection is a node, and the corridors are
edges.

Taking this new interpretation into account, the maze would represent a
spanning tree of the full graph. A spanning tree is a subgraph which creates a
tree including all the nodes of the parent graph with the minimum amount of
edges[^spanningTree], just like that, the problem becomes way more interesting.

Imagine that each possible corridor has length, and rather than choosing a 
possible corridor at random, we always pick the shortest one. It would convert
the maze into a **minimum spanning tree (MST)**[^minimumSpanningTree] of the
parent graph.

However, what is the utility of minimum spanning trees? you ask. Well, some
notable examples include taxonomy, and network design (it could be any network
like your local telecommunication connections, your city's water supply or
electrical grid)[^applications].

## Prim's Algorithm
There are several algorithms to calculate MSTs one of which is the Prim's
Algorithm.

Created by Vojtěch Jarník later popularized by Robert Prim and Edsger Dijkstra,
Prim's algorithm finds a minimum spanning tree in a weighted undirected graph.

In a very high level, the algorithm chooses an arbitrary node and marks it.
Then, from the edges connected to other nodes that are not yet in the tree
select the one which weighs less and mark the connected node as part of the
tree. Finally, repeat until all nodes are in the tree.

### High level maze algorithm
Now coming back to the maze, the original Prim's algorithm doesn't work because
the edge selection is focused around the weight. Fortunately, the only change 
we need to make in order to generate a proper maze is to select edges
randomly instead of choosing the minimum weighted one. 

This variation is often called the Randomized Prim's algorithm, and in pseudo
code it looks like this[^randomPrim]:

- Select a node at random and mark it as part of the maze. Add all adjacent
  edges to a pending list.
- Iterate over the pending edges:
    - Pick a random edge from the pending list. 
    - Every edge connects two nodes, if only one of the two is part of the
      maze, then mark the edge and node as part of the maze.
    - Add all the new neighbouring edges to the pending list.

### Implementation
Now for the good stuff, I included a visual implementation of the randomized
Prim's algorithm. You can execute it **slow** to see how each iteration
performs the different decisions or run it **fast** and in a massive size just
to appreciate the beauty of pseudo-randomness and its ordered chaos.

If you decide you like one of its creations you can download the generated maze
by clicking on the PNG button below the maze and if you would like to see the 
details of how this is implemented you can see the full source code, download
it and play with it by visiting
[Visual Implementation of the Randomized Prim's Algorithm in GitHub](https://gist.github.com/jltorresm/33c43df80118267699f0f9bfc13ba59e).

<div class="interactive-demo" id="prims-visualization">
    <header class="header">
        <p class="explanation"><b>Select</b> the <em>speed</em> of the 
        <b>animation</b>, the <em>size</em> of the <b>maze</b>, and click
        <em>start</em>.
        </p>
        <div class="form">
            <div class="options">
            <template v-for="(value, readable, idx) in availableDelays">
                <input v-model="delay" v-bind:id="'delay-'+value" v-bind:value="value" name="delay" type="radio" class="group"/>
                <label v-bind:for="'delay-'+value">[[ readable ]]</label>
            </template>
            </div>
            <div class="options">
            <template v-for="value in availableSizes">
                <input v-model="size" v-bind:id="'size-'+value" v-bind:value="value" name="size" type="radio" class="group" v-bind:disabled="isRunning"/>
                <label v-bind:for="'size-'+value">[[ value ]]</label>
            </template>
            </div>
            <button class="btn btn--large" v-bind:class="{'btn--info': !isRunning, 'btn--secondary': isRunning}" v-on:click="start" v-bind:disabled="isRunning">
                <i class="fas" v-bind:class="{'fa-play': !isRunning, 'fa-running': isRunning}"></i>
                <span>[[ isRunning ? 'running...' : 'start' ]]</span>
            </button>
        </div>
    </header>
    <section class="graph" id="maze-container">
        <canvas id="maze" v-bind:width="canvasSize.width" v-bind:height="canvasSize.height"></canvas>
    </section>
    <footer>
        <button class="btn btn--large" v-bind:class="{'btn--info': !isRunning && canvasExists, 'btn--secondary': isRunning}" v-on:click="saveToPNG" v-bind:disabled="isRunning || !canvasExists">
            <i class="fas fa-file-download"></i>&nbsp;<span>PNG</span>
        </button>
    </footer>
</div>

## Further Reading
**Article**. Maze generation in general and overview of algorithms.<br>
"Maze generation algorithm".
[Go to article](https://en.wikipedia.org/wiki/Maze_generation_algorithm).
{: .notice--warning}

**Article**. Detailed explanation of Prim's algorithm.<br>
"Prim's algorithm".
[Go to article](https://en.wikipedia.org/wiki/Prim%27s_algorithm).
{: .notice--warning}

**Video**. Prim's algorithm sequence animated on a formal graph.<br>
"Prim's Algorithm Animation".
[See the video](https://www.youtube.com/watch?v=wpV1wvHqyuY).
{: .notice--warning}

**Article**. In depth view of minimum spanning trees.<br>
"Minimum spanning tree".
[Go to article](https://en.wikipedia.org/wiki/Minimum_spanning_tree).
{: .notice--warning}

## Footnotes and References
[^spanningTree]: More info about spanning trees [here](https://en.wikipedia.org/wiki/Spanning_tree).
[^minimumSpanningTree]: More info about minimum spanning trees [here](https://en.wikipedia.org/wiki/Minimum_spanning_tree#Applications).
[^applications]: Read more formal applications for MST in this two resources from Virginia Tech and University of Texas in Dallas respectively: [Lecture in MST Applications](http://courses.cs.vt.edu/cs5114/spring2009/lectures/lecture08-mst-applications.pdf), [Applications of minimum spanning trees](https://personal.utdallas.edu/~besp/teaching/mst-applications.pdf).
[^randomPrim]: Paraphrased from Wikipedia's description of [this same algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim's_algorithm).

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/assets/js/prims.js"></script>
