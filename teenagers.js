Teenagers = new Mongo.Collection("teenagers");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    teenagers: function () {
      return Teenagers.find({}); 
    }
  });
  
  //jquery for stat rolling
  $(document).ready(function(){

    //stats as an array
    stats = ["#smarts", "#rwp", "#driving", "#cool", "#bod", "#luck", "#looks", "#bonk"];

    //roll dice function
    function dice (x, n, y) {
      var resultNumber = 0;
      for(i = 0; i < x; i++) {
          resultNumber = Math.floor((Math.random() * n) + 1) + y;
      }
      return resultNumber;
    }
  
    //on button click roll each stat
    $("#stats").click(function() { 
      for(stat in stats) {
        $(stats[stat]).val(dice(1, 6, 0));
      }
    });
  });

  
  Template.body.events({
    "submit .new-teenager": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var charName = event.target.charName.value;
      var type = event.target.type.value;
      var smarts = event.target.smarts.value;
      var rwp = event.target.rwp.value;
      var driving = event.target.driving.value;
      var cool = event.target.cool.value;
      var bod = event.target.bod.value;
      var luck = event.target.luck.value;
      var looks = event.target.looks.value;
      var bonk = event.target.bonk.value;
      var powerA = event.target.powerA.value;
      var powerB = event.target.powerB.value;
      var powerC = event.target.powerC.value;
      var nameA = event.target.knackA.value;
      var bonusA = event.target.bonusA.value;
      var statA = event.target.statA.value;
      var nameB = event.target.knackB.value;
      var bonusB = event.target.bonusB.value;
      var statB = event.target.statB.value;
      var nameC = event.target.knackC.value;
      var bonusC = event.target.bonusC.value;
      var statC = event.target.statC.value;
      var traitA = event.target.traitA.value;
      var traitB = event.target.traitB.value;
      var traitC = event.target.traitC.value;

      // Insert a task into the collection
      Teenagers.insert({
        charName: charName,
        type: type,
        stats: {
        smarts: smarts,
        rwp: rwp, 
        driving: driving, 
        cool: cool,
        bod: bod,
        luck: luck,
        looks: looks,
        bonk: bonk,
        },
        powers: {
        powerA: powerA,
        powerB: powerB,
        powerC: powerC,
        },
        knacks: {
          knackA: {
            nameA: nameA,
            bonusA: bonusA,
            statA: statA,
          },
          knackB: {
            nameB: nameB,
            bonusB: bonusB,
            statB: statB,
          },
          knackC: {
            nameC: nameC,
            bonusC: bonusC,
            statC: statC,
          },
        },
        traits: {
        traitA: traitA, 
        traitB: traitB, 
        traitC: traitC,
        },
      });

      // Clear form
      event.target.text.value = "";
    }
  });
  
  Template.teenager.events({
    "click .delete": function () {
      Teenagers.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
