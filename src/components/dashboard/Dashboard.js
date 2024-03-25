import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './sidebar';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Dashboard = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [nbByFiliere, setNbByFiliere] = useState(null);
    const [nbByNiveau, setNbByNiveau] = useState(null);
    const [listePaiement, setListePaiement] = useState(null);
    const [nombreInscriptionPayer, setNombreInscriptionPayer] = useState();
    const nombreInscrit = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}inscription/total/inscrit`);
            console.log(reponse.data);
            setNbByFiliere(reponse.data.statsByFiliere);
            setNbByNiveau(reponse.data.statsByNiveau);
        }catch(error){
            console.log(error);
        }
    }
    const nombreInscriptionPaye = async()=>{
        try{
        const reponse = await axios.get(`${apiURL}inscription/inscrits/payer`);
        console.log(reponse);
        setNombreInscriptionPayer(reponse.data)
        }catch(error){
            console.log(error);
        }
    }

    const listePaiementEnAttente = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}paiement/paiementEnAttente/total`);
            console.log(reponse.data);
            setListePaiement(reponse.data);
        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        nombreInscrit();
        nombreInscriptionPaye();
        listePaiementEnAttente();
    },[]);
    
    return (
        <div>
            
            <Header />
            
            <Sidebar />
            <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">

                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    
                </div>
                <section className="section dashboard">
                    <div className="row">

                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-8">
                        <div className="row">

                            {/* <!-- Sales Card --> */}
                            {nbByFiliere && nbByFiliere.map((filiere)=>(
                                <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">

                                    <div className="card-body">
                                    <h5 className="card-title">{filiere.Filiere.nom} </h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                        </div>
                                        <div className="ps-3">
                                        <h6>{filiere.totalInscrits}</h6>
                                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                            
                            {/* <!-- End Sales Card --> */}

                            {/* <!-- Revenue Card --> */}
                            { nbByNiveau && nbByNiveau.map((nb)=>(
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">


                                    <div className="card-body">
                                    <h5 className="card-title">Niveau : {nb.niveau}</h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-currency-dollar"></i>
                                        </div>
                                        <div className="ps-3">
                                        <h6>{nb.totalInscrits}</h6>
                                        <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                            { nombreInscriptionPayer &&(
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">


                                    <div className="card-body">
                                    <h5 className="card-title">Nombre d'inscription payer : {nombreInscriptionPayer}</h5>

                                    </div>

                                </div>
                            </div>
                            )}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">

                                    <div className="filter">
                                    <Link to='#' className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                        </li>

                                        <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                        <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                        <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                                    </ul>
                                    </div>

                                    <div className="card-body">
                                    <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                                    <table className="table table-borderless datatable">
                                        <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Motifs</th>
                                            <th scope="col">Mois</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        {listePaiement && listePaiement.map((liste)=>(
                                            
                                        <tbody>
                                        <tr>
                                            <th scope="row">{ new Date(liste.dateVersement).getDate()}/{liste.dateVersement && new Date(liste.dateVersement).getMonth() + 1}/{liste.dateVersement && new Date(liste.dateVersement).getFullYear()}</th>
                                            <td>{liste.montantTotal}</td>
                                            <td>{liste.motifs}</td>
                                            <td>{liste.nombreMois}</td>
                                            <td><span className="badge bg-success">{liste.etatPaiement}</span></td>
                                        </tr>
                                       
                                        </tbody>
                                        ))}
                                    </table>

                                    </div>

                                </div>
                            </div>
                            {/* <!-- End Recent Sales --> */}

                            {/* <!-- Top Selling --> */}
                            <div className="col-12">
                                <div className="card top-selling overflow-auto">

                                    <div className="filter">
                                    <Link to='#' className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                        </li>

                                        <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                        <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                        <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                                    </ul>
                                    </div>

                                    <div className="card-body pb-0">
                                        <h5 className="card-title">Top Selling <span>| Today</span></h5>
                                            
                                        <table className="table table-borderless">
                                            <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                            </thead>
                                            {listePaiement && listePaiement.map((listes)=>(
                                            <tbody>
                                           
                                            <tr>
                                                <th scope="row"><img src="assets/img/product-1.jpg" alt=""/></th>
                                                <td><Link to='#'  className="text-primary fw-bold">{listes.id}</Link></td>
                                                <td>$64</td>
                                                <td className="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><img src="assets/img/product-2.jpg" alt=""/></th>
                                                <td><Link to='#'  className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                                                <td>$46</td>
                                                <td className="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><img src="assets/img/product-3.jpg" alt=""/></th>
                                                <td><Link to='#'  className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                                                <td>$59</td>
                                                <td className="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><img src="assets/img/product-4.jpg" alt=""/></th>
                                                <td><Link to='#'  className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                                                <td>$32</td>
                                                <td className="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><img src="assets/img/product-5.jpg" alt=""/></th>
                                                <td><Link to='#'  className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                                                <td>$79</td>
                                                <td className="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                            
                                            </tbody>
                                            ))}
                                        </table>
                                           
                                    </div>

                                </div>
                            </div>
                            {/* <!-- End Top Selling --> */}

                        </div>
                        </div>
                        {/* <!-- End Left side columns -->

                        <!-- Right side columns --> */}
                        <div className="col-lg-4">

                        {/* <!-- Recent Activity --> */}
                        <div className="card">
                            <div className="filter">
                            <Link to='#' className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                <h6>Filter</h6>
                                </li>

                                <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                            </ul>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Recent Activity <span>| Today</span></h5>

                                <div className="activity">

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">32 min</div>
                                        <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                        <div className="activity-content">
                                            Quia quae rerum <Link to='#'  className="fw-bold text-dark">explicabo officiis</Link> beatae
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">56 min</div>
                                        <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                                        <div className="activity-content">
                                            Voluptatem blanditiis blanditiis eveniet
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">2 hrs</div>
                                        <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                                        <div className="activity-content">
                                            Voluptates corrupti molestias voluptatem
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">1 day</div>
                                        <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                                        <div className="activity-content">
                                            Tempore autem saepe <Link to='#'  className="fw-bold text-dark">occaecati voluptatem</Link> tempore
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">2 days</div>
                                        <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                                        <div className="activity-content">
                                            Est sit eum reiciendis exercitationem
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                    <div className="activity-item d-flex">
                                        <div className="activite-label">4 weeks</div>
                                        <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                                        <div className="activity-content">
                                            Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                                        </div>
                                    </div>
                                    {/* <!-- End activity item--> */}

                                </div>

                            </div>
                        </div>
                        {/* <!-- End Recent Activity --> */}

                        {/* <!-- Budget Report --> */}
                        <div className="card">
                            <div className="filter">
                                <Link to='#' className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                                </ul>
                            </div>

                            <div className="card-body pb-0">
                                <h5 className="card-title">Budget Report <span>| This Month</span></h5>

                                <div id="budgetChart" className="echart"></div>

                            </div>
                        </div>
                        {/* <!-- End Budget Report --> */}

                        {/* <!-- Website Traffic --> */}
                        <div className="card">
                            <div className="filter">
                                <Link className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                                </ul>
                            </div>

                            <div className="card-body pb-0">
                                <h5 className="card-title">Website Traffic <span>| Today</span></h5>

                                <div id="trafficChart" className="echart"></div>

                            </div>
                        </div>
                        {/* <!-- End Website Traffic -->

                        <!-- News & Updates Traffic --> */}
                        <div className="card">
                            <div className="filter">
                                <Link to='#' className="icon"  data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><Link to='#' className="dropdown-item" >Today</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Month</Link></li>
                                    <li><Link to='#' className="dropdown-item" >This Year</Link></li>
                                </ul>
                            </div>

                            <div className="card-body pb-0">
                            <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>

                            <div className="news">
                                <div className="post-item clearfix">
                                    <img src="assets/img/news-1.jpg" alt=""/>
                                    <h4>Nihil blanditiis at in nihil autem</h4>
                                    <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img src="assets/img/news-2.jpg" alt=""/>
                                    <h4>Quidem autem et impedit</h4>
                                    <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img src="assets/img/news-3.jpg" alt=""/>
                                    <h4>Id quia et et ut maxime similique occaecati ut</h4>
                                    <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img src="assets/img/news-4.jpg" alt=""/>
                                    <h4>Laborum corporis quo dara net para</h4>
                                    <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                                </div>

                                <div className="post-item clearfix">
                                    <img src="assets/img/news-5.jpg" alt=""/>
                                    <h4>Et dolores corrupti quae illo quod dolor</h4>
                                    <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                                </div>

                            </div>
                            {/* <!-- End sidebar recent posts--> */}

                            </div>
                        </div>
                        {/* <!-- End News & Updates --> */}

                        </div>
                        {/* <!-- End Right side columns --> */}

                    </div>
                </section>

            </main>
            <footer id="footer" className="footer">
                <div className="copyright">
                &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;