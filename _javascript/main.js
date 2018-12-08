
var ctx = document.getElementById('myChart').getContext('2d');
let listData = [];
let mainData = [];
let listDataObject = {};
let letters = 'ABCDE';
let pieData = {'A':0, 'B':0, 'C':0, 'D':0, 'E':0};
let search = '';
let mainDataSorted = [];

drawChart = () => {
  new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
    data: {
        labels: Object.keys(pieData),
        datasets: [{
            data: Object.values(pieData) ,
            backgroundColor: ['#ff6384','#36a2eb','#cc65fe','#ffce56','#ccc']
        }]
    },
    // Configuration options go here
    options: {}
});
}

var dataSet={
    search: search,
    listData: listData,
    mainData: mainData,
    mainDataSorted: mainData
}
new Vue({
    beforeCreate:()=>{fetch('https://data.gov.ru/sites/default/files/opendata/7710881420-Cafe/data-2015-06-25T00-00-00-structure-2015-06-25T00-00-00.json')
    .then(data=>{return data.json()})
    .then(res=>{return res.filter((i)=>'Name_en' in i && i.Name_en[0])})
    .then(res=>{ return res.filter((i)=>letters.indexOf(i.Name_en[0]) !== -1)
      })
    .then(res=>{
      dataSet.mainDataSorted = [...res];
      dataSet.mainData = [...res];
      for(let i=0; i<res.length; i++){
        pieData[res[i].Name_en[0]]+=1;
      }
      drawChart();
      for(let i=0; i<letters.length; i++) {
        listDataObject['letter'] = letters[i];
        listDataObject['value'] = pieData[letters[i]];
        listData.push({...listDataObject});
      }
    })
    },
    data:dataSet,
    el:'#example'

})


new Vue ({
  data: dataSet,
  el:'#example2'
})


new Vue ({
  data: dataSet,
  el:'#example3',
  methods: {
    searchItem: (e) => {
      const search = event.target.value.toLowerCase();
      if(search !== ''){
        dataSet.mainDataSorted = dataSet.mainData.filter((i)=>i.Name_en.toLowerCase().indexOf(search) === 0);
      } else {
        dataSet.mainDataSorted = dataSet.mainData
      }
    }
  }
})

