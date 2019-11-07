var app = new Vue({
  el: '#app',
  data: {
    countries: [],
    prefix: '',
    name: '',
    savedName: '',
    savedCountry: '',
    gender: '',
    probability: 0,
    count: 0,
    defined: false,
  },
  methods: {
    setCountry: function(e) {
        console.log(e.target.getAttribute("value"));
    },
    fetchREST() {
      console.log("In Fetch " + this.prefix);
      var url = "getcountry?q=" + this.prefix;
      if(!this.prefix){
        this.countries = [];
        return;
      }
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((countrylist) => {
          console.log("CountryList");
          console.log(countrylist);
          this.countries = [];
          for (let i = 0; i < countrylist.length; i++) {
            console.log(countrylist[i].country);
            this.countries.push({ name: countrylist[i].country, code: countrylist[i].code });
          };
          console.log("Got Countrylist");
        });
    },
    determineGender(){
      console.log("owl rest");
      var url = "gender?name=" + this.name + "&country_id=" + this.country.code;
      fetch(url)
        .then((data) => {
          if(!data.ok) {
            this.defined = false;
            return;
          }
          this.defined = true;
          return (data.json());
        })
        .then((response) => {
          if(!this.defined){
            return;
          }
          if(!response.gender){
            this.defined = false;
          }
          console.log(response);
          this.gender = response.gender;
          this.probability = response.probability * 100;
          this.count = response.count;
          this.savedName = this.name;
          this.savedCountry = this.country.name
        });
    },
  },
  computed: {
    country() {
      if (((this.countries).length > 0) && this.prefix.length){
        return this.countries[0]
      }
      else{
        return {name: "United States", code: "US"}
      }
    },

  },
});
