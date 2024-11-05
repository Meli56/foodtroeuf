const OrderPage = () => {
  return (
    <div className={"flex justify-center flex-col p-24"}>
      <div className={"p-8 mx-auto bg-white card w-96 shadow-xl flex gap-2 my-8"}>
        <h1 className="text-2xl text-black ">Votre réservation a bien été prise en compte. Merci !</h1>
      </div>
      <a href="/home" className="btn btn-primary mt-4 text-white mx-auto text-center">Retour à l'accueil</a>
    </div>

  );
};

export default OrderPage;