<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }
    public function __invoke(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);
        if (
            !array_key_exists('email', $requestContent) ||
            !array_key_exists(
                'password',
                $requestContent
            )
        ) {

            $message = 'Un problème technique est survenu, veuillez réessayer ultérieurement
 return new Response($message, 500)';
        }
        $userEmail = $requestContent['email'];
        $userPassword = $requestContent['password'];
        $userLastName = $requestContent['lastname'];
        $userFirstName = $requestContent['firstname'];
        $userTel = $requestContent['tel'];
        $userAdresse = $requestContent['adresse'];
        $userRole = $requestContent['roles'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);

        if ($registeredUser) {
            return new Response('Adresse email déjà enregistrée', 409);
        }

        $newUser = new User();
        $newUser->setLastname($userLastName);
        $newUser->setFirstname($userFirstName);
        $newUser->setTel($userTel);
        $newUser->setAdresse($userAdresse);
        $newUser->setEmail($userEmail);
        $newUser->setRoles($userRole);
        $newUser->setPassword(
            $this->passwordHasher->hashPassword($newUser, $userPassword)
        );
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('OK', 200);
    }
}
