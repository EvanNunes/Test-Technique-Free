<?php

namespace App\Controller;

use App\Entity\Intervention;
use App\Repository\AntennaRepository;
use App\Repository\InterventionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class InterventionController extends AbstractController
{

    /**
     * Crée une nouvelle intervention liée à une antenne.
     *
     * Valide que les champs "antenna_id" et "description" sont présents,
     * que l'antenne existe, et qu'aucune intervention n'est déjà en cours sur celle-ci.
     * @param Request $request
     * @param AntennaRepository $antennaRepository
     * @param EntityManagerInterface $manager
     * @return JsonResponse L'intervention créée (201) ou un message d'erreur (400)
     */
    #[Route('/api/intervention', name: 'api_intervention', methods: ['POST'])]
    public function intervention(Request $request, AntennaRepository $antennaRepository, EntityManagerInterface $manager): JsonResponse
    {

        $body = $request->getContent() ;
        $data = json_decode($body, true);

        if (empty($data['antenna_id']) || empty($data['description'])) {
            return $this->json(['error' => 'antenna_id et description sont requis'], 400);
        }
        if (strlen($data['description']) > 255) {
            return $this->json(['error' => 'Description trop longue'], 400);
        }

        $antenna = $antennaRepository->find((int) $data['antenna_id']);
        if (empty($antenna)) {
            return $this->json(['error' => 'antenna introuvable'], 400);
        }

        $lastIntervention = $antenna->getLastIntervention();
        if ($lastIntervention && $lastIntervention->getEndedAt() == null) {
            return $this->json(['error' => 'Intervention deja en cours'], 400);
        }

        $intervention = new Intervention();
        $intervention->setAntennaId($antenna);
        $intervention->setDescription($data['description']);
        $intervention->setCreatedAt(new \DateTimeImmutable('now'));
        $manager->persist($intervention);
        $antenna->addIntervention($intervention);
        $manager->flush();


        return $this->json($intervention, 201, [], ['groups' => ['intervention:read']]);
    }

    /**
     * Clôture une intervention en cours en valorisant son champ "ended_at".
     *
     * Vérifie que l'intervention existe et qu'elle n'est pas déjà terminée
     * avant de la clôturer avec la date et l'heure courantes.
     * @param InterventionRepository $interventionRepository
     * @param int $id
     * @param EntityManagerInterface $manager
     * @return JsonResponse L'intervention clôturée (200) ou un message d'erreur (400/404)
     */
    #[Route('/api/intervention/{id}', name: 'api_close_intervention', methods: ['PATCH'])]
    public function closeIntervention(InterventionRepository $interventionRepository, int $id, EntityManagerInterface $manager): JsonResponse
    {

        $intervention = $interventionRepository->find($id);
        if (empty($intervention)) {
            return $this->json(['error' => 'Intervention introuvable'], 400);
        }
        if ($intervention->getEndedAt() !== null) {
            return $this->json(['error' => 'Intervention  deja terminée'], 400);
        }

        $intervention->setEndedAt(new \DateTimeImmutable('now'));
        $manager->flush();


        return $this->json($intervention, 200, [], ['groups' => ['intervention:read']]);
    }
}
