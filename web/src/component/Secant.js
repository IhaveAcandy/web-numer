import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,range } from 'mathjs'
import api from './api/index'


window.$arr_iteration = []
window.$arr_x = []
window.$arr_y = []
window.$arr_error = []
window.$xold = 0
window.$xnew = 0 
window.$ans = 0

class Secant extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            fx: "",
            f: "",
            xl: 2,
            xr: 2,
            update: 0
        };
      }

      myChangexold = (event) => {
        window.$xold = event.target.value
        this.setState({update: this.state.update++});
      }

      myChangexnew = (event) => {
        window.$xnew = event.target.value
        this.setState({update: this.state.update++});
      }
      
      myChangefx = (event) => {
        this.setState({fx: event.target.value});
      }

      secant = () => {
        this.setState({f: this.state.fx});
        window.$ans = 0
        window.$arr_iteration = []
        window.$arr_x = []
        window.$arr_y = []
        window.$arr_error = []
        const funtion = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old) / xm_new) 
        var xm_new = window.$xnew
        var xm_old = window.$xold
        var temp
        var i = 0
        while(error(xm_new,xm_old)>0.000001){
            temp = xm_new
            xm_new = xm_new-(funtion(this.state.fx, xm_new)*(xm_old-xm_new)/(funtion(this.state.fx, xm_old)-funtion(this.state.fx, xm_new)))
            xm_old = temp
            window.$arr_iteration.push(i)
            window.$arr_x.push(parseFloat(xm_new).toFixed(6))
            window.$arr_y.push(parseFloat(xm_old).toFixed(6))
            window.$arr_error.push(error(xm_new,xm_old).toFixed(6))
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
                <th>x_new</th>,
                <th>x_old</th>,
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
            axios.get("http://192.168.99.100:8080/api/users/showSecant").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_iteration = []
            window.$arr_x = []
            window.$arr_y = []
            window.$arr_error = []
            window.$xold = 0
            window.$xnew = 0 
            window.$ans = 0
    }

    // componentDidMount = async () => {
    //     console.log("in")
    //     await api.getSecant().then(res => {
    //         this.setState({users: res.data.data});
    //     })
    //     window.$arr_iteration = []
    //     window.$arr_x = []
    //     window.$arr_y = []
    //     window.$arr_error = []
    //     window.$xold = 0
    //     window.$xnew = 0 
    //     window.$ans = 0
    // }

    re = (event) => {
        this.setState({update: this.state.update++});
        this.setState({fx: window.$fx});
    }

    render()
    {
        const fx = this.state.f
        const xans = window.$ans
        const yans = parse(fx).evaluate({ x: xans })
        const x = range(-10, 10, 0.5).toArray()
		const y = x.map(function (x) {
			return  parse(fx).evaluate({ x: x })
        }) 
        console.log("x : " + x)  
        console.log("y : " + y)    
        const trace1 = {
            x: x,
            y: y,
            mode: 'lines+markers',
            name: 'function'
        };

        const trace2 = {
            x: [xans],
            y: [yans],
            mode: 'markers',
            name: 'ans'
        };
        
        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>Secant</p>
                </div>

                <div className="info1">
                    <h1>ANS : {Math.abs(window.$ans)}</h1>
                    <h1>FX : {this.state.fx}</h1>
                    <h1>X_OLD : {window.$xold}</h1>
                    <h1>XR_NEW : {window.$xnew}</h1>
                </div>

                <div className="funtion">
                    <div><h1>funtion : </h1></div>
                    <div><input onChange={this.myChangefx}/></div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>x_old :</h1></div>
                        <div><input onChange={this.myChangexold}/></div>
                        <div><h1>x_new :</h1></div>
                        <div><input onChange={this.myChangexnew}/></div><br/>
                        
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.secant}>submit</button></div>  
                    <div><button onClick={this.re.bind(this)}>refresh</button></div> 
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data = {[ trace1 , trace2 ]}
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
export default Secant;
