
const app = Vue.createApp({
    data() {
        return {
            listOfTasks: [
                {
                    name: 'Muhamad',
                    tasks: [
                        { title: "Write an introduction about vue.js components.", done: true },
                        { title: "Drink a cup of team.", done: false },
                        { title: "Call Jamil.", done: false },
                        { title: "Buy new book.", done: true }
                    ]
                },
                {
                    name: 'My house',
                    tasks: [
                        { title: "Clean windows.", done: false},
                        { title: "Bring some vegetables and fruits.", done: true},
                        { title: "Wash clothes", done: false}
                    ]
                }
            ],
        }   
    }
})

app.component('tasks', {
    props: {
        name: String,
        tasks_list: Array
    },
    template: 
    /* html */
    `
        <div class='tasks-container'>
            <input id="hide_cmp_tasks" type="checkbox" v-model="hide_completed_tasks"/>
            <label for="hide_cmp_tasks">Hide completed tasks</label>
            
            <table class='w3-table-all'>
                <colgroup>
                    <col style="width:15%">
                    <col style="width:85%">
                </colgroup>
                <thead>
                    <tr>
                        <th colspan="2">
                            <center>{{ name }} - Tasks</center>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Done</strong>
                        </td>
                        <td>
                            <strong>Title</strong>
                        </td>
                    </tr>
                    <tr v-for="task in filtered_tasks" :key="task.title">
                        <td>
                            <input type="checkbox" v-model="task.done" />
                        </td>
                        <td>
                            {{ task.title }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="add-task-container">
                <span>Task: </span>

                <div>
                    <input @keyup.enter="add_new_task" type="text" v-model="new_task_text"/>
                </div>

                <input type="button" value="Add" v-on:click="add_new_task"/>
            </div>
        </div>
    `,
    data() {
        return {
            hide_completed_tasks: false,
            new_task_text: ""
        }
    },
    computed: {
        filtered_tasks() {
            return this.hide_completed_tasks ? this.tasks_list.filter(t => !t.done) : this.tasks_list;
        }
    },
    methods: {
        add_new_task(event) {
            this.tasks_list.push({ title: this.new_task_text, done: false });
            this.new_task_text = "";
        }
    }
})

app.mount('#app')