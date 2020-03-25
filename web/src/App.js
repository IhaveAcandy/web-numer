import React,{Component} from 'react';
import 'antd/dist/antd.css';
import NewtonRaphson from './component/NewtonRaphson';
import Bisection from './component/Bisection';
import FalsePosition from './component/FalsePosition';
import OnePointIteration from './component/OnePointIteration';
import Secant from './component/Secant';
import CramerRule from './component/CramerRule';
import GaussElimination from './component/GaussElimination';
import Gaussjorden from './component/Gaussjorden';
import LUDecomposition from './component/LUDecomposition';
import JacobiIteration from './component/JacobiIteration';
import ConjugateGradient from './component/ConjugateGradient';
import GaussSeidel from './component/GaussSeidel';
import NewtonDivideDifference from './component/NewtonDivideDifference';
import Lagrange from './component/Lagrange';
import Spline from './component/Spline';
import LinearRegression from './component/LinearRegression';
import PolynomialRegression from './component/PolynomialRegression';
import MultipleLinearRegression from './component/MultipleLinearRegression';
import CompositeTrapezoidalRule from './component/CompositeTrapezoidalRule';
import CompositeSimpsonRule from './component/CompositeSimpsonRule';
import EulerMethod from './component/EulerMethod';
import HeunMethod from './component/HeunMethod';
import ModifierEulerMethod from './component/ModifierEulerMethod';

// import Add from './component/componentForHomeContent/Add';
// import Delete from './component/componentForHomeContent/Delete';
import './styleindex.css';
//import axios from 'axios';
//import {Link} from 'react-router-dom'

class App extends Component
{
  
  constructor(props)
  {
    super(props);
    this.state = {
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    };
  }

  openBisection = ()=>{
      this.setState({
      Bisection : true,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
      })
  }

 openFalsePosition = ()=>{
    this.setState({
      Bisection : true,
      FalsePosition : true,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openOnePointIteration = ()=>{
    this.setState({
      Bisection : true,
      FalsePosition : false,
      OnePointIteration : true,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openNewtonRaphson = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:true,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openSecant = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:true,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openCramerRule = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:true,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openGaussElimination = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:true,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openGaussjorden = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:true,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openLUDecomposition = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:true,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openJacobiIteration = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:true,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openConjugateGradient = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:true,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openGaussSeidel = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:true,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openNewtonDivideDifference = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:true,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openLagrange = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:true,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openSpline = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:true,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openLinearRegression= ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:true,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openPolynomialRegression = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:true,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openMultipleLinearRegression = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:true,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openCompositeTrapezoidalRule = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:true,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openCompositeSimpsonRule = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:true,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openEulerMethod = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:true,
      HeunMethod:false,
      ModifierEulerMethod:false
    })
  }

  openHeunMethod = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:true,
      ModifierEulerMethod:false
    })
  }

  openModifierEulerMethod = ()=>{
    this.setState({
      Bisection : false,
      FalsePosition : false,
      OnePointIteration : false,
      NewtonRaphson:false,
      Secant:false,
      CramerRule:false,
      GaussElimination:false,
      Gaussjorden:false,
      LUDecomposition:false,
      JacobiIteration:false,
      ConjugateGradient:false,
      GaussSeidel:false,
      NewtonDivideDifference:false,
      Lagrange:false,
      Spline:false,
      LinearRegression:false,
      PolynomialRegression:false,
      MultipleLinearRegression:false,
      CompositeTrapezoidalRule:false,
      CompositeSimpsonRule:false,
      EulerMethod:false,
      HeunMethod:false,
      ModifierEulerMethod:true
    })
  }

  render()
  {
    let renderComponent = <Bisection/>;

    if(this.state.Bisection)
    {
      renderComponent = <Bisection/>;
    }
    if(this.state.FalsePosition)
    {
      renderComponent = <FalsePosition/>
    }
    if(this.state.OnePointIteration)
    {
      renderComponent = <OnePointIteration/>;
    }
    if(this.state.NewtonRaphson)
    {
      renderComponent = <NewtonRaphson/>
    }
    if(this.state.Secant)
    {
      renderComponent =<Secant/>
    }
    if(this.state.CramerRule)
    {
      renderComponent =<CramerRule/>
    }
    if(this.state.GaussElimination)
    {
      renderComponent =<GaussElimination/>
    }
    if(this.state.Gaussjorden)
    {
      renderComponent =<Gaussjorden/>
    }
    if(this.state.LUDecomposition)
    {
      renderComponent =<LUDecomposition/>
    }
    if(this.state.JacobiIteration)
    {
      renderComponent =<JacobiIteration/>
    }
    if(this.state.ConjugateGradient)
    {
      renderComponent =<ConjugateGradient/>
    }
    if(this.state.GaussSeidel)
    {
      renderComponent =<GaussSeidel/>
    }
    if(this.state.NewtonDivideDifference)
    {
      renderComponent =<NewtonDivideDifference/>
    }
    if(this.state.Lagrange)
    {
      renderComponent =<Lagrange/>
    }
    if(this.state.Spline)
    {
      renderComponent =<Spline/>
    }
    if(this.state.LinearRegression)
    {
      renderComponent =<LinearRegression/>
    }
    if(this.state.PolynomialRegression)
    {
      renderComponent =<PolynomialRegression/>
    }
    if(this.state.MultipleLinearRegression)
    {
      renderComponent =<MultipleLinearRegression/>
    }
    if(this.state.CompositeTrapezoidalRule)
    {
      renderComponent =<CompositeTrapezoidalRule/>
    }
    if(this.state.CompositeSimpsonRule)
    {
      renderComponent =<CompositeSimpsonRule/>
    }
    if(this.state.EulerMethod)
    {
      renderComponent =<EulerMethod/>
    }
    if(this.state.HeunMethod)
    {
      renderComponent =<HeunMethod/>
    }
    if(this.state.ModifierEulerMethod)
    {
      renderComponent =<ModifierEulerMethod/>
    }
    return(
      <div>
        <nav id="menubar" class="navbar navbar-default" role="navigation">
        <div class="container">
            <div id="logo" class="navbar-header">
                <h1>
                   <a href="index.php">Numerical</a>
                </h1>
            </div>
            <div id="menu" class="navigation collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <li class="root of equation"><a>Root of Equation</a>
                            <ul>
                                <li><a onClick={this.openBisection}>Bisection</a></li>
                                <li><a onClick={this.openFalsePosition}>False Position</a></li>
                                <li><a onClick={this.openOnePointIteration}>One Point Iteration</a></li>
                                <li><a onClick={this.openNewtonRaphson}>Newton Raphson</a></li>
                                <li><a onClick={this.openSecant}>Secant</a></li>
                            </ul>
                        </li>
                        <li class="Linear"><a>Linear Algebra</a>
                            <ul>
                                <li><a onClick={this.openCramerRule}>Cramer's Rule</a></li>
                                <li><a onClick={this.openGaussElimination}>Gauss Elimination</a></li>
                                <li><a onClick={this.openGaussjorden}>Gauss jorden</a></li>
                                <li><a onClick={this.openLUDecomposition}>LU Decomposition</a></li>
                                <li><a onClick={this.openJacobiIteration}>Jacobi Iteration</a></li>
                                {/* <li><a onClick={this.openConjugateGradient}>Conjugate Gradient</a></li> */}
                                <li><a onClick={this.openGaussSeidel}>Gauss Seidel Iteration</a></li>
                            </ul>
                        </li>
                        <li class="Iterative Method"><a>Interpolation</a>
                            <ul>
                                <li><a onClick={this.openNewtonDivideDifference}>Newton Divide Difference</a></li>
                                <li><a onClick={this.openLagrange}>Lagrange</a></li>
                                <li><a onClick={this.openSpline}>Spline</a></li> 
                            </ul>
                        </li>
                        <li class="Least Square Error"><a>Least Square Error</a>
                            <ul>
                                <li><a onClick={this.openLinearRegression}>Linear Regression</a></li>
                                <li><a onClick={this.openPolynomialRegression}>Polynomial Regression</a></li>
                            </ul>
                        </li>
                        <li class="Integration"><a>Integration</a>
                            <ul>
                                <li><a onClick={this.openCompositeTrapezoidalRule}>Composite Trapezoidal</a></li>
                                <li><a onClick={this.openCompositeSimpsonRule}>Composite Simpson</a></li>
                            </ul>
                        </li>
                        <li class="Ordinary Differential Equation"><a>Ordinary Differential</a>
                            <ul>
                                <li><a onClick={this.openEulerMethod}>Forward divided-differences</a></li>
                                <li><a onClick={this.openHeunMethod}>Backward divided-differences</a></li>
                                <li><a onClick={this.openModifierEulerMethod}>Central divided-differences</a></li> 
                            </ul>
                        </li>
                    </ul>
            </div>
        </div>
    </nav>
      {renderComponent}
      <footer>
        <h1>footer</h1>
      </footer>
      </div>
    )
  }
}
export default App;
