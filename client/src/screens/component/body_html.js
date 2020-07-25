import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js'
const Body_html = () => {
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [status, setStatus] = useState({})
    const [state_district, setState_district] = useState({})
    const [district_wise, setDistricwise] = useState([])
    useEffect(() => {
        fetch("https://api.covid19api.com/summary").then(res => res.json()).then(data => {
            sessionStorage.setItem("covid", JSON.stringify(data.Countries));
            var json = data;
            var ctx = document.getElementById('myChart1').getContext("2d");
            var myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: ['New Confirmed Cases', 'Total Confirmed Cases', 'New Deaths', 'Total Deaths', 'New Recovered', 'Total Recovered'],
                    datasets: [{
                        label: 'Global Cases',
                        data: [json.Global.NewConfirmed, json.Global.TotalConfirmed, json.Global.NewDeaths, json.Global.TotalDeaths, json.Global.NewRecovered, json.Global.TotalRecovered],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            setCountry(data.Countries)
            change_chart("AF")

        })
            .catch(err => {
                // window.location.reload();
            })
    }, [])

    const change_chart = (concode) => {

        var json = JSON.parse(sessionStorage.getItem("covid"));
        var i = 0;
        do {
            if (json[i].CountryCode == concode) {
                var ctx = document.getElementById('myChart2').getContext("2d");
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['New Confirmed Cases', 'Total Confirmed Cases', 'New Deaths', 'Total Deaths', 'New Recovered', 'Total Recovered'],
                        datasets: [{
                            label: '# of Cases in ' + json[i].Country,
                            data: [json[i].NewConfirmed, json[i].TotalConfirmed, json[i].NewDeaths, json[i].TotalDeaths, json[i].NewRecovered, json[i].TotalRecovered],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 0, 0, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 0, 0, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                break;
            }
            i++;
        } while (1);
    }

    useEffect(() => {
        fetch("https://api.covidindiatracker.com/state_data.json").then(res => res.json()).then(data => {
            setState(data);
        })

    }, [])

    useEffect(() => {
        fetch("https://api.covid19india.org/state_district_wise.json").then(res => res.json()).then(data => {
            setState_district(data);

        }).catch(err => {
            console.log(err)
        })

    }, [])

    const changeTable = (name) => {

        // console.log(state_district[name].districtData)
        // console.log(state_district[name].districtData[Object.keys(state_district[name].districtData)[0]].active)
        var y = [];
        var x = Object.keys(state_district[name].districtData);
        for (let index = 0; index < x.length; index++) {
            y.push({
                "name": x[index], "active": state_district[name].districtData[x[index]].active, "deaths": state_district[name].districtData[x[index]].deceased
                , "recovered": state_district[name].districtData[x[index]].recovered
            })
        }
        setDistricwise(y)
        console.log(district_wise);
    }
    //  

    // Object.keys(state_district_wise).map(district => {
    //     console.log(district)
    //     return(
    //         <tr>

    //             <td>{district}</td>
    //             <td>{state_district_wise.districtData.district.active}</td>

    //             <td>{state_district_wise.districtData.district.deceased}</td>
    //             <td>{state_district_wise.districtData.district.recovered}</td>
    //         </tr>
    //         )
    // })






    return (
        <>
            <div className="container-fluid">
                <div className="row text-white bg-info">
                    <marquee>Stay at Home, stay safe</marquee>
                </div>
                <div className="row">
                    <div className="col-sm-2 border-right border-bottom">
                        <ul className="navbar nav nav-pills" id="change">
                            <li className="nav-item mb-1"><a className="nav-link active" href="#stats">Stats</a></li>
                            <li className="nav-item mb-1"><a className="nav-link" href="#region">States and Union Territory Data</a></li>
                            <li className="nav-item mb-1"><a className="nav-link" href="#Measures">Measures</a></li>
                            <li className="nav-item mb-1"><a className="nav-link" href="#awareness">Awareness</a></li>

                        </ul></div>
                    <div className="col-sm-8 border-right">

                        <div className="row mt-4 pb-4 border-bottom" >
                            <div className="container-fluid">
                                <h1 className="text-danger">Covid - 19 Stats</h1>
                                <div className="row">
                                    <div className="col-sm-6 text-info"><h3>
                                        Global Stats
                </h3><canvas id="myChart1" width="6vw" height="6vh"></canvas></div>
                                    <div className="col-sm-6 text-info ">
                                        <div className="container">
                                            <div className="row">
                                                <h3>
                                                    Country Wise
                </h3>
                                                <div className="form-group ml-1 mx-auto">
                                                    <select className="form-control" id="country" onChange={(e) => { change_chart(e.target.value) }}>
                                                        {


                                                            country.map(country => {
                                                                return (
                                                                    <option value={country.CountryCode}>{country.Country}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div></div><canvas id="myChart2" width="6vw" height="6vh"></canvas></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4 pb-4 border-bottom" id="region">
                            <div className="container-fluid">

                                <h1 className="text-danger">
                                    States and union territory wise data
                </h1>
                                <div className="row" id="app1">
                                    <select className="form-control justify-content-center mr-3 ml-3" onChange={(e) => { setStatus(JSON.parse(e.target.value)); changeTable(JSON.parse(e.target.value).name) }}>
                                        <option selected disabled>Select state / union territory</option>
                                        {
                                            state.map(state => {

                                                return (
                                                    <option value={JSON.stringify({
                                                        "active": state.active, "recovered": state.recovered, "deaths": state.deaths, "name": state.state
                                                    })}>{state.state}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <div className="container-fluid">

                                        <div className="row mt-2 d-flex justify-content-between">
                                            <div className="col-sm-4 mt-2 mx-auto">
                                                <div className="card bg-info">
                                                    <img src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-infected.png?v=1590593297316" className="img-reponsive mx-auto" width="70vw" />
                                                    <div className="card-body text-white">
                                                        <h2 className="d-flex justify-content-center">
                                                            Active Cases
                        </h2>
                                                        <span id="active" className="d-flex justify-content-center" style={{ fontSize: "4vh" }}>{status.active}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 mt-2 mx-auto">
                                                <div className="card bg-success">
                                                    <img src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-inactive.png?v=1590593297316" className="img-reponsive mx-auto" width="70vw" />
                                                    <div className="card-body text-white">
                                                        <h2 className="d-flex justify-content-center">
                                                            Recovered
                        </h2>
                                                        <span id="inactive" className="d-flex justify-content-center" style={{ fontSize: "4vh" }}>{status.recovered}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 mt-2 mx-auto">
                                                <div className="card bg-danger">
                                                    <img src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-death.png?v=1590593297316" className="img-reponsive mx-auto" width="70vw" />
                                                    <div className="card-body text-white">
                                                        <h2 className="d-flex justify-content-center">
                                                            Total Death
                        </h2>
                                                        <span id="death" className="d-flex justify-content-center" style={{ fontSize: "4vh" }}>{status.deaths}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2 text-center ">
                                            <div className="col d-flex justify-content-center mx-auto">
                                                <table className="table table-dark table-striped mx-auto" >
                                                    <tr><th>City Name</th><th>Active</th><th>Recovered</th><th>Deaths</th></tr>
                                                    {
                                                        district_wise.map(district => {
                                                            return (
                                                                <tr>
                                                                    <td>{district.name}</td>
                                                                    <td style={{ color: "#80bfff" }}>{district.active}</td>

                                                                    <td style={{ color: "#0f0" }}>{district.recovered}</td>
                                                                    <td style={{ color: "#ff751a" }}>{district.deaths}</td>
                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row mt-4 pb-4 border-bottom">
                            <div className="container-fluid">
                                <h1 id="Measures" className="text-danger">Covid - 19 Measures</h1>
                                <h3 className="text-info">
                                    You can reduce your chances of being infected or spreading COVID-19 by taking some simple precautions:
                </h3>
                                <ul className="list-group">
                                    <li className="list-group-item">Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.
                  Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</li>
                                    <li className="list-group-item">Maintain at least 1 metre (3 feet) distance between yourself and others.
                                    Why? When someone coughs, sneezes, or speaks they spray small liquid droplets from their nose or mouth which may contain virus.
                                    If you are too close, you can breathe in the droplets,
                  including the COVID-19 virus if the person has the disease.</li>
                                    <li className="list-group-item">Avoid going to crowded places. Why? Where people come together in crowds,
                                    you are more likely to come into close contact with someone that has COIVD-19 and
                  it is more difficult to maintain physical distance of 1 metre (3 feet).</li>
                                    <li className="list-group-item">Avoid touching eyes, nose and mouth. Why? Hands touch many surfaces and can pick up viruses.
                                    Once contaminated, hands can transfer the virus to your eyes, nose or mouth.
                  From there, the virus can enter your body and infect you.</li>
                                    <li className="list-group-item">Make sure you, and the people around you, follow good respiratory hygiene.
                                    This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze.
                                    Then dispose of the used tissue immediately and wash your hands. Why? Droplets spread virus.
                  By following good respiratory hygiene, you protect the people around you from viruses such as cold, flu and COVID-19.</li>
                                    <li className="list-group-item">Stay home and self-isolate even with minor symptoms such as cough, headache, mild fever, until you recover. Have someone bring you supplies. If you need to leave your house,
                                    wear a mask to avoid infecting others.
                    Why? Avoiding contact with others will protect them from possible COVID-19 and other viruses.</li>
                                </ul>
                            </div>
                        </div>
                        <h1 className="text-danger" id="awareness">Awareness</h1>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-4 mt-2 embed-responsive embed-responsive-16by9 mx-auto ml-2">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/WE1KYyisKGs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                                <div className="col-sm-4  mt-2 embed-responsive embed-responsive-16by9 mx-auto ml-2">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/xf1HULn7tuI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                                <div className="col-sm-4  mt-2 embed-responsive embed-responsive-16by9 mx-auto ml-2">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/Kh2mUBNLjj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                            </div>
                        </div>
                        <div className="row mt-2 pb-4 border-bottom">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-4  mt-2 d-flex justify-content-center">
                                        <a href="https://www.mohfw.gov.in/pdf/socialdistancingEnglish.pdf" target="_blank"><img src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Fcovid1.png?v=1590472756966" className="img-responsive" /></a>
                                    </div>
                                    <div className="col-sm-4  mt-2 d-flex justify-content-center">
                                        <a href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_ENg.pdf" target="_blank"><img className="img-responsive" src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Fcovid2.png?v=1590472769256" /></a>
                                    </div>
                                    <div className="col-sm-4  mt-2 d-flex justify-content-center">
                                        <a href="https://www.mohfw.gov.in/pdf/ProtectivemeasuresEng.pdf" target="_blank"><img className="img-responsive" src="https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Fcovid3.png?v=1590472777443" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-4">
                            <div className="col-sm-5 text-secondary mx-auto">
                                <blockqoute><i className="fas fa-quote-right"></i> Doctors won’t make you healthy. Nutritionists won’t make you slim. Teachers won’t make you smart. Gurus won’t make you calm.
                  Mentors won’t make you rich. Trainers won’t make you fit. Ultimately, you have to take responsibility. Save yourself. <i className="fas fa-quote-left"></i></blockqoute>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-info d-flex justify-content-center text-white">

                <div className="row">
                    <div className="col-12">
                        Helpline Number : +91-11-23978046 Toll Free : 1075 Helpline Email ID : <a href="mailto:ncov2019@gov.in" className="text-white">ncov2019@gov.in</a>
                    </div></div>
            </div>
            <div className="container-fluid bg-dark pt-4 pb-4">
                <h2 className="text-light d-flex justify-content-center">
                    Stay healthy, Stay Safe !
          </h2>
            </div>

        </>
    );
}
export default Body_html