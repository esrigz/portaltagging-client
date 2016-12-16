// var Vue = require('vue');

new Vue({
  el: '#app',

  data: {
    tag: { _id: '', name: '', type: '' },
    tags: []
  },

  mounted: function () {
    this.fetchTags();
  },

  methods: {

    fetchTags: function () {
      var tags = [];
      this.$http.get('//localhost:3000/portaltags')
        .then(function (tags) {
          this.tags = tags.body;
          console.log(tags);
        },function (err) {
          console.log(err);
        });
    },

    addTag: function () {
      if (this.tag.name.trim()) {
        this.$http.post('//localhost:3000/portaltags', this.tag)
          .then(function (res) {
            this.tags.push(this.tag);
            console.log('tag added!');
          },function (err) {
            console.log(err);
          });
      }
    },

    deleteTag: function (index,id) {
      if (confirm('確定要删除？')) {
        this.$http.delete('//localhost:3000/portaltags/' + id)
          .then(function (res) {
            console.log(res);
            this.tags.splice(index, 1);
          },function (err) {
            console.log(err);
          });
      }
    }
  }
});