---
title:      "Maze Generation with Prim's algorithm"
slug:       "prims-algorithm"
date:       2020-09-07 13:45:00
categories: programming
tags:       prim algorithm labyrinth maze
toc:        true
toc_sticky: true
toc_label:  "In this post"
toc_icon:   "flask"
excerpt: "A short spoiler"
header:
  overlay_image:  "/assets/images/algorithm.jpg"
  teaser:         "/assets/images/algorithm.jpg"
  overlay_filter: rgba(0, 0, 0, 0.3)
  caption:        "Photo by [Blake Connally](https://unsplash.com/@blakeconnally) on Unsplash"
---

Here goes the intro

## Why generate mazes?
asdf

## Prim's Algorithm
adsf

### High level workflow
asdf

## Implementation
The real deal

<div class="interactive-demo" id="prims-visualization">
    <header class="header">
        <p class="explanation"><b>Select</b> the <em>speed</em> of the
         animation, the <em>size</em> of the maze, and click <em>start</em>.
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
</div>

## Further Reading
**Article**. Detailed explanation of Prim's algorithm.
[Go to aticle](https://en.wikipedia.org/wiki/Prim%27s_algorithm).
{: .notice--warning}

**Article**. Maze generation in general and overview of algorithms.<br>
"Maze generation algorithm."
[Go to aticle](https://en.wikipedia.org/wiki/Maze_generation_algorithm).
{: .notice--warning}

## Footnotes and References
[^ncsc2019]: Most hacked passwords revealed as UK cyber survey exposes gaps in online security. [URL](https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security). Accessed: 2020-09-05.
[^krebsSanix]: Bryan Krebs. Ukraine Nabs Suspect in 773M Password 'Megabreach'. [URL](https://krebsonsecurity.com/2020/05/ukraine-nabs-suspect-in-773m-password-megabreach/). Published: 2019-05-19.

# <script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="/assets/js/prims.js"></script>
