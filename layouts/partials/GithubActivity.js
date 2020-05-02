// Vue.component('GithubActivity', {
//   name: 'github-activity',
//   template: `
// <div class="" >
//     <div v-for="(g, i) in git" :key="i">
//         <br>
//         <div class="animated bounceInRight" v-html="g"></div>
//         <br>
//         <hr class="animated bounceInLeft">
//     </div>
// </div>
//   `,
//   data: function () {
//     return {
//       git: null,
//       gitActivity: {},
//       unlocked: this.getWithExpiry('unlocked')
//     }
//   },
//   computed: {
//     model_unlocked: {
//       get() {
//         return this.getWithExpiry('unlocked')
//       },
//       set(v) {
//         this.setWithExpiry('unlocked', v, 600000);
//         this.unlocked = this.getWithExpiry('unlocked')
//       }
//     },
//     model_git: {
//       get() {
//         return this.getWithExpiry('git')
//       },
//       set(v) {
//         this.setWithExpiry('git', v, 300000);
//         this.unlocked = this.getWithExpiry('git')
//       }
//     }
//   },
//   created() {
//     this.githubActivity()
//     // this.setWithExpiry('unlocked', false, 30000)
//     // this.unlocked = this.getWithExpiry('unlocked')
//   },
//   methods: {
//     setWithExpiry(key, value, ttl) {
//       const now = new Date()
//       if (!localStorage.getItem(key)) {
//         const item = {
//           value: value,
//           expiry: now.getTime() + ttl
//         };
//         localStorage.setItem(key, JSON.stringify(item))
//       }
//     },
//     getWithExpiry(key) {
//       const itemStr = localStorage.getItem(key)
//       if (!itemStr) {
//         return null
//       }
//       const item = JSON.parse(itemStr)
//       const now = new Date()
//       if (now.getTime() > item.expiry) {
//         localStorage.removeItem(key)
//         return null
//       }
//       return item.value
//     },
//     githubActivity() {
//       if (!this.model_git) {
//         fetch("http://localhost:3001/proxy?url=https://github.com/saveroo.atom")
//         .then((res) => {
//           return res.text();
//         })
//         .then((xml) => {
//           const events = ["Push", "Star", "Fork", "Gist", "Create", "Pull", "Release"];
//           const parser = new DOMParser();
//           const xmlDoc = parser.parseFromString(xml, "text/xml");
//           const t = (entry, ...args) => {
//             return entry.querySelectorAll(args)
//           };
//           const html2txt = html => html.replace(/<(?:.|\n)*?>/gm, '');
//           const content = t(xmlDoc, 'content');
//           // const content1 = t(xmlDoc, 'content').nextElementSibling;
//           // const content2 = t(xmlDoc, 'content').nextElementSibling;
//           // const cr = document.createElement('div')
//           // cr.innerHTML = content
//           // console.log()
//           let arr = [];
//           // for (let i = 0; i < 4; i++) {
//           //   arr.push(content[i].textContent)
//           // }
//           this.git = arr;
//           this.model_git = arr;
//         })
//       } else {
//         this.git = this.model_git;
//         console.log(this.git)
//       }
//     },
//     touch() {
//       let self = this;
//       this.githubActivity()
//       const container = document.querySelector('.ctr')
//       container.addEventListener('animationend', () => {
//         self.model_unlocked = true;
//         container.classList.remove('ac');
//       });
//     }
//   },
//   delimiters: ["<%", "%>"]
// })
