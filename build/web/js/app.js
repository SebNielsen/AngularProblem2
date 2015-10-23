var personApp = angular.module('PersonApp',['ngRoute']);
    
    personApp.controller('ViewController', [function(){
        var self = this;
        self.title = "Persons Demo App";
        
        
    }]).config(['$routeProvider', function($routeProvider) {
                   $routeProvider
                   .when('/', {
                       templateUrl: 'allPersons.html',
                       controller: 'PersonController'
                   })
                   .when('/detail/:id', {
                       templateUrl: 'details.html',
                       controller: 'PersonController'
                   })
                   .when('/add', {
                       templateUrl: 'addPerson.html',
                       controller: 'PersonController'
                   })
                   .otherwise({redirectTo: '/'});
       }]);
   
   personApp.controller('PersonController',['$routeParams','PersonFactory', function($routeParams,PersonFactory){
       var self = this;
       var id = $routeParams.id;
       
       self.persons = PersonFactory.getPersons();
       self.person = self.persons[id-1];
       
       self.add = function(newPerson){
           PersonFactory.addPerson(newPerson);  
       };
       
   }]);
   
   personApp.factory('PersonFactory', function(){
        var persons = [
            {id: 1,name: "Jens",age : 18}
           ,{id: 2,name: "Peter",age : 23}
           ,{id: 3,name: "Hanne",age : 23}
        ];
        
        var nextId = 4;
        
        var getPersons = function(){return persons;};
        
        var getPerson = function(id){return persons[id-1];};
        
        var addPerson = function(person){
            person.id = nextId++;
            persons.push(person);
        };
        
        return {
            getPersons: getPersons,
            getPerson: getPerson,
            addPerson: addPerson
        };
   });
   
   
   


