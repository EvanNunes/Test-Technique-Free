<?php

namespace App\Entity;

use App\Repository\AntennaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AntennaRepository::class)]
class Antenna
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['antenna:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['antenna:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['antenna:read'])]
    private ?string $city = null;

    /**
     * @var Collection<int, Intervention>
     */
    #[ORM\OneToMany(targetEntity: Intervention::class, mappedBy: 'antenna_id', orphanRemoval: true)]
    private Collection $interventions;

    public function __construct()
    {
        $this->interventions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, Intervention>
     */
    public function getInterventions(): Collection
    {
        return $this->interventions;
    }

    #[Groups(['antenna:read'])]
    public function getLastIntervention(): Intervention|false
    {
        return $this->interventions->last();
    }

    public function addIntervention(Intervention $intervention): static
    {
        if (!$this->interventions->contains($intervention)) {
            $this->interventions->add($intervention);
            $intervention->setAntennaId($this);
        }

        return $this;
    }

    public function removeIntervention(Intervention $intervention): static
    {
        if ($this->interventions->removeElement($intervention)) {
            if ($intervention->getAntennaId() === $this) {
                $intervention->setAntennaId(null);
            }
        }

        return $this;
    }
}
