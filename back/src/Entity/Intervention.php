<?php

namespace App\Entity;

use App\Repository\InterventionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: InterventionRepository::class)]
class Intervention
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['antenna:read', 'intervention:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'interventions')]
    #[ORM\JoinColumn(name: 'antenna_id', nullable: false)]
    private ?Antenna $antenna_id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['antenna:read', 'intervention:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['antenna:read', 'intervention:read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['antenna:read', 'intervention:read'])]
    private ?\DateTimeImmutable $ended_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAntennaId(): ?Antenna
    {
        return $this->antenna_id;
    }

    public function setAntennaId(?Antenna $antenna_id): static
    {
        $this->antenna_id = $antenna_id;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getEndedAt(): ?\DateTimeImmutable
    {
        return $this->ended_at;
    }

    public function setEndedAt(?\DateTimeImmutable $ended_at): static
    {
        $this->ended_at = $ended_at;

        return $this;
    }
}
