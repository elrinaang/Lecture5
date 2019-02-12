var app = new Vue({
  el: "#app",
  data: {
    message: "8AM Lectures are too tiring"
  },
  methods: {
    slowReplace: async function(word) {
      return new Promise(resolve => {
        setTimeout(() => {
          let result = word.replace("too tiring", "🙅‍♀️");
          resolve(result);
        }, 1000);
      });
    },
    reset: function() {
      this.message = "8AM lectures are illegal";
    },
    run: async function() {
      this.message = "(running)";
      let result = "🕗 ";
      // Wait on each promise to be resolved in serial.
      //result += await this.slowReplace("8AM");
      result += await this.slowReplace("lectures ");
      result += await this.slowReplace("are ");
      result += await this.slowReplace("too tiring");
      //result += await this.slowReplace(" ");
      this.message = result;
      console.log(result);
    },
    runParallel: async function() {
      this.message = "(running)";
      let result = "🕗 ";
      // Put all the promises in an array.
      let promises = [];
      //promises.push(this.slowReplace("8AM"));
      promises.push(this.slowReplace("lectures "));
      promises.push(this.slowReplace("are "));
      promises.push(this.slowReplace("too tiring"));
      //promises.push(this.slowReplace(" "));
      // Wait until all promises in the array have been fulfilled.
      let allResults = await Promise.all(promises);
      // In for loops, 'in' gives you each array index and 'of' gives you each array item.
      for (let eachResponse of allResults) {
        result = result + eachResponse;
      }
      this.message = result;
    }
  }
});
