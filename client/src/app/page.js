'use client'
import React from 'react';
import Login from '../app/login/page';
import {Link} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();
    const handleSignup = () => {
        router.push('/register');
    };
    return(
        // <section className="text-gray-600 body-font" >
        //  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        //         <div className="w-2/5">
        //             <h1 className="title-font font-medium text-3xl text-gray-900">Welcome to Chautari</h1>
        //         </div>
        //         <div className="w-3/5">
        //                 <Login style={{ padding: 0 , innerHeight: '100vh'}}/>
        //         </div>
        //         <div className="w-3/5">
        //             <p className="text-s text-black mt-3">Don't have Account? <Link  href='/register' color="danger">Sign up</Link></p>
        //         </div>
        //     </div>
        // </section>
        <section class="text-gray-600 body-font min-w-screen overflow-hidden">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 hidden lg:block">
                     <img class="object-cover object-center rounded" alt="hero" src="Chautari_logo.png"/> 
                </div>
                <div class="lg:flex-grow md:w-2/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center  flex-shrink-0">
                    <div className="w-full mt-20">
                        <h1 class="title-font sm:text-4xl text-3xl mt-6 font-medium text-gray-900 text-center">Welcome to Chautari</h1>
                        <Login>
                        <p className="container text-xs text-grey mt-3 items-center">Don't have Account? <Link  href='/register' color="danger"><span style={{ fontSize: '14px' }}>Sign up</span></Link></p>
                        </Login>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;