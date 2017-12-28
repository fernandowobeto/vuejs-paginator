Vue.component('vue-paginator', {
  props: {
    active: {
      type: Number,
      default: 1,
      twoWay: true
    },
    records: {
      type: Array,
      required: true,
      twoWay: true,
      default: []
    },
    per_page: {
      type: Number,
      default: 5
    }
  },
  data: function() {
    return {
      total_records: 0
    }
  },
  template: '<div class="pagination" v-if="pages.length > 1"><ul><li v-for="page in pages" track-by="$index" :class="classIfActive(page)"><a href="#" @click="goPage(page)">{{page}}</a></li></ul></div>',
  methods: {
    goPage: function(page) {
      if (_.isNumber(page)) {
        this.active = page;
      }
      var inicial = (page - 1) * this.per_page;
      var final = inicial + this.per_page;

      this.$dispatch('updateRecords', this.records.slice(inicial, final));
    },
    classIfActive: function(page) {
      return page == this.active ? 'active': '';
    },
    refresh: function(){
      this.total_records = this.records.length;
      this.goPage(1);
    }
  },
  computed: {
    pages: function() {
      var pageRange = 3;
      var totalPage = Math.ceil(this.total_records / this.per_page);
      var rangeStart = this.active - pageRange;
      var rangeEnd = this.active + pageRange;

      if (rangeEnd > totalPage) {
        rangeEnd = totalPage;
        rangeStart = totalPage - pageRange * 2;
        rangeStart = rangeStart < 1 ? 1 : rangeStart;
      }

      if (rangeStart <= 1) {
        rangeStart = 1;
        rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
      }

      var range = _.range(rangeStart, rangeEnd);

      if (rangeEnd < totalPage) {
        range.push('...', totalPage);
      } else {
        range.push(totalPage);
      }

      if (rangeStart != 1) {
        range.unshift(1, '...');
      }

      return range;
    }
  },
  watch: {
    total: function() {
      this.goPage(1);
    },
    records: function(){
      this.refresh();
    }
  },
  ready: function() {
    this.refresh();
  }
});