import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

window.$arr_iteration = []
window.$arr_x = []
window.$arr_y = []
window.$arr_error = []
window.$xr = 0
window.$xl = 0 
window.$ans = 0

class ConjugateGradient extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            fx: "",
            xl: 2,
            xr: 2,
            update: 0
        };
      }

      myChangexl = (event) => {
        window.$xl = event.target.value
        this.setState({update: this.state.update++});
      }

      myChangexr = (event) => {
        window.$xr = event.target.value
        this.setState({update: this.state.update++});
      }
      
      myChangefx = (event) => {
        this.setState({fx: event.target.value});
      }

    sendDatatoDB = ()=>{
        axios.post('http://localhost:9000/products',{name:this.state.name})
        .then(res=>{
            console.log(res);
        })
    }
    re = ()=>{
        this.setState({update: this.state.update++});
    }

      bisection = () => {
        window.$arr_iteration = []
        window.$arr_x = []
        window.$arr_y = []
        window.$arr_error = []
        // console.log("xl ; " + window.$xl + "xr : " + window.$xr)
        // const funtion = (fx, value) => (value**4)-13
        const funtion = (fx, value) => parse(fx).evaluate({ x: value });
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new)  
        const funtionxm = (xl, xr) => (xl + xr) / 2
        var xm_new
        var xm_old
        var i = 0
        while (i <= 1 || error(xm_new, xm_old) > 0.000001){
            xm_old = xm_new
            xm_new = funtionxm(parseFloat(window.$xl), parseFloat(window.$xr))
            if ( funtion(this.state.fx, parseFloat(xm_new)) * funtion(this.state.fx, parseFloat(window.$xl)) > 0){
                window.$xl = xm_new
            } else {
                window.$xr = xm_new
            }
            window.$arr_iteration.push(i)
            window.$arr_x.push(xm_new.toFixed(6))
            window.$arr_y.push(funtion(this.state.fx, parseFloat(xm_new)).toFixed(6))
            window.$arr_error.push(error(parseFloat(xm_new), parseFloat(xm_old)).toFixed(6))
            i++
        }      
        window.$ans = xm_new.toFixed(6)
        this.setState({update: this.state.update++});
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_iteration.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>iteration</th>,
                <th>xm</th>,
                <th>f(xm)</th>,
                <th>error</th>)
          }else{
            children.push(
                <td>{window.$arr_iteration[i]}</td>,
                <td>{window.$arr_x[i]}</td>,
                <td>{window.$arr_y[i]}</td>,
                <td>{window.$arr_error[i]}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }
    
    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showUser").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
    }

    render()
    {

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>ConjugateGradient</p>
                </div>

                <div className="info1">
                    <h1>ANS : {Math.abs(window.$ans)}</h1>
                    <h1>FX : {this.state.fx}</h1>
                    <h1>XL : {window.$xl}</h1>
                    <h1>XR : {window.$xr}</h1>
                </div>

                <div className="funtion">
                    <div><h1>function : </h1></div>
                    <div><input onChange={this.myChangefx}/></div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>xl :</h1></div>
                        <div><input onChange={this.myChangexl}/></div>
                        <div><h1>xr :</h1></div>
                        <div><input onChange={this.myChangexr}/></div><br/>
                        
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.bisection}>submit</button></div>  
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data={[
                                {
                                    x: window.$arr_x,
                                    y: window.$arr_y
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data={[
                            {
                               x: window.$arr_iteration,
                               y: window.$arr_error
                            }
                            ]}
                        />
                    </div>
                </div>

                <div className = "T">
                    <div className="Head">   
                        <h1>Table</h1>
                    </div>
                    <div class="container">
                        <table id="customers">
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConjugateGradient;

