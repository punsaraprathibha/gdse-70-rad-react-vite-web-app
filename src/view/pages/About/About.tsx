export function About() {
    return (
        <div className="flex justify-center px-4 py-10">
            <div className="max-w-2xl w-full text-center">
                <h2 className="text-4xl font-bold text-green-500 underline decoration-4 mb-6">
                    About Us
                </h2>
                <p className="text-md md:text-base text-gray-700 leading-relaxed">
                    At <span className="font-semibold text-green-600">Organic Shop</span>, we believe in the power of nature to nourish, heal, and inspire. Our journey began with a simple yet profound realization: the importance of embracing organic living for the well-being of both individuals and the planet.
                    <br /><br />
                    <span className="font-semibold">Mission:</span> Our mission is to make organic living accessible to all, fostering a harmonious relationship between people and the environment. We are committed to offering a diverse range of high-quality, ethically sourced, and sustainable products that promote health, wellness, and a greener lifestyle.
                </p>
            </div>
        </div>
    );
}