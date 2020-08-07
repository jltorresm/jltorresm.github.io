---
layout: single
title: Some Random Calculators
permalink: /calculators
---

<div class="calculator" id="time-calculator">
    <header class="header">
        <h1>Times</h1>
        <p class="explanation">Add times in the format <em>hh:mm:ss</em> 
        or an ISO 8601 duration, e.g.:<em>P1Y2M3DT4H5M6S</em>.
        <br>Double click on a time to edit it.
        <br>Click on the <em>clear</em> button to remove all current times.</p>
        <div class="form">
            <input
                class="new-value"
                autocomplete="off"
                placeholder="Add time..."
                v-model="newTime"
                v-on:keyup.enter="addTime"
            />
            <button class="btn btn--info btn--large" v-on:click="clearTimes">
                <i class="fas fa-trash"></i><span>clear</span>
                </button>
        </div>
    </header>
    <section class="main" v-show="times.length" v-cloak>
        <ul class="values-list">
            <li
                v-for="time in times"
                class="time"
                v-bind:key="time.id"
                v-bind:class="{ editing: time == editedTime }"
            >
                <div class="view">
                    <label v-on:dblclick="editTime(time)">[[ time.value ]]</label>
                    <button class="destroy" v-on:click="removeTime(time)"></button>
                </div>
                <input
                    class="edit"
                    type="text"
                    v-model="time.value"
                    v-time-focus="time == editedTime"
                    v-on:blur="doneEdit(time)"
                    v-on:keyup.enter="doneEdit(time)"
                    v-on:keyup.esc="cancelEdit(time)"
                />
            </li>
        </ul>
    </section>
    <section class="results">
        <label v-on:click="changeTotalTimeRender()">Sum:<em>[[ totalTimeFormatted ]]</em></label>
        <label v-on:click="changeAverageTimeRender()">Average:<em>[[ averageTimeFormatted ]]</em></label>
    </section>
</div>

<div class="calculator" id="distance-converter">
    <header class="header">
        <h1>Distance Conversions</h1>
        <p class="explanation">Insert your distance and select the original units.</p>
        <p class="notice--danger" v-show="!!error">[[ error ]]</p>
        <div class="form">
            <input
                class="new-value"
                autocomplete="off"
                placeholder="Insert a distance..."
                type="number"
                v-model.number="distance"
            />
            <div class="options">
            <template v-for="(readable, value, idx) in availableUnits" v-bind:key="idx">
                <input 
                    v-model="unit" 
                    v-bind:id="'unit-'+value" 
                    v-bind:value="value" 
                    name="unit" 
                    type="radio" 
                    class="group" 
                />
                <label v-bind:for="'unit-'+value">[[ readable ]]</label>
            </template>
            </div>
        </div>
    </header>
    <section class="results">
        <label v-for="(readable, value) in availableUnits">[[ readable | capitalize ]]:<em>[[ convertTo(value) ]]</em></label>
    </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="/assets/js/dist/moment-duration-format.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/assets/js/calculators.js"></script>
    