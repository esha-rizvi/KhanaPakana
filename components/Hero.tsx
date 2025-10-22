import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/900?food,kitchen')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                    <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-down" style={{fontFamily: "'Georgia', serif"}}>
                        Cook. Taste. Enjoy.
                    </h1>
                    <p className="text-xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        Discover Authentic Halal Pakistani Recipes You’ll Love!
                    </p>
                </div>
            </div>
            <style>
                {`
                    @keyframes fade-in-down {
                        0% {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fade-in-up {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fade-in-down {
                        animation: fade-in-down 1s ease-out forwards;
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 1s ease-out forwards;
                    }
                `}
            </style>
        </div>
    );
}

export default Hero;