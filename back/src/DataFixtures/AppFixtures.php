<?php

namespace App\DataFixtures;

use App\Entity\Antenna;
use App\Entity\Intervention;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $antennasData = [
            ['name' => 'Antenne Montpellier', 'city' => 'Montpellier'],
            ['name' => 'Antenne Odysseum', 'city' => 'Montpellier'],
            ['name' => 'Antenne Paris', 'city' => 'Paris'],
            ['name' => 'Antenne Nîmes', 'city' => 'Nîmes'],
            ['name' => 'Antenne Lyon', 'city' => 'Lyon'],
            ['name' => 'Antenne Marseille', 'city' => 'Marseille'],
            ['name' => 'Antenne Toulouse', 'city' => 'Toulouse'],
        ];

        foreach ($antennasData as $data) {
            $antenna = new Antenna();
            $antenna->setName($data['name']);
            $antenna->setCity($data['city']);
            $manager->persist($antenna);

            $intervention1 = new Intervention();
            $intervention1->setAntennaId($antenna);
            $intervention1->setDescription('Ajouts de la 5G');
            $intervention1->setCreatedAt(new DateTimeImmutable('-10 days'));
            $intervention1->setEndedAt(new DateTimeImmutable('-8 days'));
            $manager->persist($intervention1);

            $intervention2 = new Intervention();
            $intervention2->setAntennaId($antenna);
            $intervention2->setDescription('Problème réseau');
            $intervention2->setCreatedAt(new DateTimeImmutable('-2 days'));
            $intervention2->setEndedAt(null);
            $manager->persist($intervention2);
        }

        $manager->flush();
    }
}
