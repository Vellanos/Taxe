<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PayementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PayementRepository::class)]
#[ApiResource]
class Payement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'payements')]
    private ?User $user = null;

    #[ORM\OneToOne(inversedBy: 'payement', cascade: ['persist', 'remove'])]
    private ?Contravention $contravention = null;

    #[ORM\Column(length: 16)]
    private ?string $card_number = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $card_date = null;

    #[ORM\Column(length: 3)]
    private ?string $card_cryptogram = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getContravention(): ?Contravention
    {
        return $this->contravention;
    }

    public function setContravention(?Contravention $contravention): static
    {
        $this->contravention = $contravention;

        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->card_number;
    }

    public function setCardNumber(string $card_number): static
    {
        $this->card_number = $card_number;

        return $this;
    }

    public function getCardDate(): ?\DateTimeInterface
    {
        return $this->card_date;
    }

    public function setCardDate(\DateTimeInterface $card_date): static
    {
        $this->card_date = $card_date;

        return $this;
    }

    public function getCardCryptogram(): ?string
    {
        return $this->card_cryptogram;
    }

    public function setCardCryptogram(string $card_cryptogram): static
    {
        $this->card_cryptogram = $card_cryptogram;

        return $this;
    }
}
