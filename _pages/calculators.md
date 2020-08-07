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

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="/assets/js/dist/moment-duration-format.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
# <script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/assets/js/calculators.js"></script>
    