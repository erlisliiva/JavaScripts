app.controller('myCntrl', function ($scope) {

    $scope.foods = [{name_est: "XXX", price: "0.0", providers: {0: "daily"}}];

    console.log('Entering: mounted()');
    let req = new XMLHttpRequest();
    console.log('XMLHttpRequest created');
    req.onreadystatechange = function () {
        console.log('inside onreadystatechange event');
        if (req.readyState === 4 && req.status === 200) {
            // Typical action to be performed when the document is ready:
            try {
                $scope.foods = JSON.parse(req.responseText).data;
                console.log('JSON parse OK, cnt=' + $scope.foods.length);
                // refresh table with new data
                $scope.$digest();
            }
            catch (ev) {
                console.log('JSON parse error' + ev);
            }
        }
    };
    console.log('mounted, sending data request');
    req.open('GET', 'https://api.fuud.ituk.ee/daily');
    req.send();

    $scope.sortByName = function () {
        $scope.foods.sort(function (a, b) {
            return (
                a.name_est < b.name_est ? -1 :
                    (a.name_est === b.name_est ? 0 : 1))
        });
        //$scope.$digest();
    };
    $scope.orderByField = function (field) {
        if ($scope.orderedBy === field) {
            $scope.orderedBy = '-' + field;
        } else
            $scope.orderedBy = field;
    }
});

