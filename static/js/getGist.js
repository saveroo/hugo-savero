Vue.component('get-gist',{
  data() {
    return {
      // gist: props.gist,
      // file: props.file,
      // cssAdded: false,
      gistCallbackId: 0,
      loading: true,
      src: ''
    }
  },
  props: ['gist', 'file', 'cssAdded'],
  created() {
    const nextGist = () => {
      return 'embed_gist_callback_' + this.gistCallbackId++
    };
    let gistCallback = nextGist();
    window[gistCallback] = function(gist) {
      // console.log(gist)
      this.loading = false;
      this.src = gist.div;
      this.addCss(gist.stylesheet)
    }.bind(this)

    let url = 'https://gist.github.com/' + this.gist + '.json?callback=' + gistCallback;
    if (this.file) {
      url += '&file=' + this.file;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  },
  methods: {
    addCss(href) {
      if(!this.cssAdded) {
        this.cssAdded = true;
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link)
      }
    }
  },
  template: `
    <div>
    <div v-html="src"></div>
    </div>
  `
});

new Vue({
  el: '#gists',
  components: ['get-gist'],
  data: function () {
    return {
      test: `
        <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Example HTML5 Document</title>
                            </head>
                            <body>
                            <p>Test</p>
                            </body>
                            </html>`,
      gists: null,
      gist_filename: null,
      gist_index: null,
      gist_language: null,
      gist_raw: null,
      gist_data: null,
      g_json: null,
    }
  },
  delimiters: ["<%", "%>"],
  created() {
    this.getGists();
  },
  methods: {
    ft(api) {
      return new Promise((resolve, reject) => {
        fetch(api, {mode: 'no-cors', headers: {
            'Content-Type': 'application/json'
          }})
        .then(res => {
          return res.text()
        })
        .then(data => {
          resolve(data ? JSON.parse(data) : {})
        })
        .catch((error) => {
          reject(error)
        });
      })
    },
    async getG(owner, id, filename, key) {
      this.gist_index = key;
      // let api = `https://gist.github.com/${ owner.owner.login }/${ id }.json`;
      // let ft = await this.ft(api);
      // console.log(ft);
      // // console.log(fetchGist)
      // this.getGist(id, filename, '', key).then(async res => {
      //   api = "https://gist.github.com/saveroo/306f54e1a0dd40a5587ef5e5f0348c3b.json";
      //   return res;
      // }).then(async data => {
      // });
    },
    async getGist(id, filename, language, key) {
      let api = "https://api.github.com/gists/"+id;
      let ft = await axios.get(api);
      let ftt = ft.data;
      // console.log(ftt);
      this.gist_index = key;
      this.gist_filename = filename;
      this.gist_language = language.toLowerCase();
      this.gist_raw = ftt.files[filename].content;
      this.gist_data = ftt;
      return ftt
    },
    async getCode(url) {
      console.log(url);
      let ft = await fetch(url);
      let ftt = await ft.text();
    },
    getGists() {
      let api = "https://api.github.com/users/saveroo/gists";
      let self = this;
      fetch(api).then(response => {
        return response.json()
      })
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          // for (key in data[i].files) {
          // self.getCode(data[i].files[key].raw_url)
          // }
          // for (let j = 0; j < data[i].files.length; j++) {
          //   console.log(data[i].files[Object.keys(data[i].files)[j]].raw_url)
          //   // self.getCode(data[i].files[Object.keys(data[i].files)[j]].raw_url)
          //   // console.log(data[i].files);
          // }
        }
        this.gists = data;
      })
    }
  }
})
