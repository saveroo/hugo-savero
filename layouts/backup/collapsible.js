Vue.component("collapsible", {
  template: `
    <div class="collapsible-wrapper">
     <div class="collapsible"><slot name="title"></slot></div>
    <div class="contentd">
        <slot></slot>
    </div>
    </div>
  `,
  props: ['title'],
  data: () => ({
    display: 'block',
    active: false,
    maxHeight: '0px',
  }),
  mounted() {
    this.oc();
  },
  methods: {
    oc() {
      var coll = document.getElementsByClassName("collapsible");
      for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", () => {
          coll[i].classList.toggle("active");
          let content = coll[i].nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        })
      }
    },
    openClose() {
      // let containerHeight = this.$el.querySelector('.accordion-content').offsetHeight;
      // if (this.active) {
      //   this.maxHeight = '0px';
      // } else {
      //   this.maxHeight = containerHeight + 32 + 'px';
      // }
      // this.active = !this.active;
      // let containerHeight = this.$el.querySelector('.contentd').offsetHeight;
      // if (this.active) {
      //   this.maxHeight = '0px';
      // } else {
      //   this.maxHeight = containerHeight + 32 + 'px';
      // }
      // this.active = !this.active;
    }
  }
});
